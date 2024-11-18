import cn from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { GRID_SIZE } from "../../consts/board";
import {
    INITIAL_DIRECTION,
    INITIAL_SNAKE_POSITION,
} from "../../consts/initial";
import { INVERTED_CONTROLS_TIME } from "../../consts/controls";
import { SideEffect } from "../../consts/SideEffect";
import { Direction } from "../../enums/Direction";
import { GameState } from "../../enums/GameStatus";
import { INVERTED_DIRECTION } from "../../helpers/getNormalizedDirection/getNormalizedDirection";
import { moveSnake } from "../../helpers/moveSnake/moveSnake";
import { onKeydown } from "../../helpers/onKeydown/onKeydown";
import { spawnFood } from "../../helpers/spawnFood/spawnFood";
import { useManageSideEffects } from "../../hooks/useManageSideEffects/useManageSideEffects";
import { FoodSchema } from "../../typings/FoodSchema";
import { OptionsSchema } from "../../typings/OptionsSchema";
import { PositionSchema } from "../../typings/PositionSchema";
import { Food } from "../Food/Food";
import { Grid } from "../Grid/Grid";
import { Snake } from "../Snake/Snake";
import { Score } from "../Score/Score";

import styles from "./Board.module.css";

export interface BoardProps {
    className?: string;
    options: OptionsSchema;
    onStartGame: () => void;
    onResumeGame: () => void;
    onCollision: () => void;
    onFoodCollision: (food: FoodSchema) => void;
}

export const Board = ({
    className,
    options,
    onStartGame,
    onResumeGame,
    onCollision,
    onFoodCollision,
}: BoardProps) => {
    const requestRef = useRef<ReturnType<typeof requestAnimationFrame>>(-1);
    const previousTimeRef =
        useRef<ReturnType<typeof requestAnimationFrame>>(-1);

    const deltaStepRef = useRef<number>(0);
    const deltaInvertedRef = useRef<number>(0);

    const snakeRef = useRef<PositionSchema[]>(INITIAL_SNAKE_POSITION);
    const foodRef = useRef<Nullable<FoodSchema>>(spawnFood(snakeRef.current));

    const prevDirectionRef = useRef<Direction>(INITIAL_DIRECTION);
    const nextDirectionRef = useRef<Direction>(INITIAL_DIRECTION);

    // Forcing rendering
    const [, setVer] = useState<number>(0);

    const {
        sideEffectsRef,
        updateSingleSideEffect,
        applyFoodEffects,
        resetSideEffects,
    } = useManageSideEffects();

    // Clearing all variables after a collision
    const onCollisionHandler = useCallback(() => {
        snakeRef.current = INITIAL_SNAKE_POSITION;
        foodRef.current = spawnFood(snakeRef.current);
        prevDirectionRef.current = INITIAL_DIRECTION;
        nextDirectionRef.current = INITIAL_DIRECTION;

        resetSideEffects();
        onCollision();
    }, [onCollision, resetSideEffects]);

    // Adding more food after a food collision; handling special effects
    const onFoodCollisionHandler = useCallback(
        (food: FoodSchema) => {
            foodRef.current = spawnFood(snakeRef.current);

            applyFoodEffects(food);
            onFoodCollision(food);
        },
        [applyFoodEffects, onFoodCollision],
    );

    useEffect(() => {
        if (options.gameState !== GameState.ACTIVE) {
            return;
        }

        function step(time: number) {
            if (previousTimeRef.current != undefined) {
                // Calculating the time difference since the last frame
                const deltaTime = time - previousTimeRef.current;

                const speed = sideEffectsRef.current[SideEffect.SPEED];
                const isInvertedDirection =
                    sideEffectsRef.current[SideEffect.IS_INVERTED_CONTROLS];

                deltaStepRef.current = deltaStepRef.current + deltaTime;

                // Cancelling the inverted direction special effect
                if (isInvertedDirection) {
                    deltaInvertedRef.current =
                        deltaInvertedRef.current + deltaTime;

                    if (deltaInvertedRef.current > INVERTED_CONTROLS_TIME) {
                        deltaInvertedRef.current = 0;

                        updateSingleSideEffect(
                            SideEffect.IS_INVERTED_CONTROLS,
                            false,
                        );
                    }
                }

                // Updating the snake's movement based on the current speed and direction.
                if (1000 / speed < deltaStepRef.current) {
                    deltaStepRef.current = 0;

                    // Preventing opposite direction
                    if (
                        nextDirectionRef.current !==
                        INVERTED_DIRECTION[prevDirectionRef.current]
                    ) {
                        prevDirectionRef.current = nextDirectionRef.current;
                    }

                    // Calculating new snake position
                    const nextSnake = moveSnake(
                        snakeRef.current,
                        foodRef.current,
                        prevDirectionRef.current,
                        onCollisionHandler,
                        onFoodCollisionHandler,
                    );

                    if (nextSnake) {
                        snakeRef.current = nextSnake;
                    }

                    // Forcing rendering
                    setVer((prev) => ++prev);
                }
            }

            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(step);
        }

        requestRef.current = requestAnimationFrame(step);

        return () => cancelAnimationFrame(requestRef.current);
        // Make sure the effect runs only once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options.gameState]);

    const onKeydownHandler = useCallback(
        (event: KeyboardEvent) => {
            const handler = onKeydown(
                options.gameState,
                sideEffectsRef.current[SideEffect.IS_INVERTED_CONTROLS],
                // Saving next direction
                (direction: Direction) =>
                    (nextDirectionRef.current = direction),
                options.gameState === GameState.GAME_OVER
                    ? onStartGame
                    : onResumeGame,
            );

            return handler(event);
        },
        [onResumeGame, onStartGame, options.gameState, sideEffectsRef],
    );

    // Tracking keyboard
    useEffect(() => {
        document.addEventListener("keydown", onKeydownHandler);

        return () => document.removeEventListener("keydown", onKeydownHandler);
    }, [onKeydownHandler]);

    // Pausing the game when changing window/tab
    useEffect(() => {
        if (options.gameState !== GameState.ACTIVE) {
            return;
        }

        document.addEventListener("visibilitychange", onResumeGame);

        return () =>
            document.removeEventListener("visibilitychange", onResumeGame);
    }, [onResumeGame, options.gameState]);

    return (
        <div
            className={cn(styles.board, className)}
            style={{ aspectRatio: GRID_SIZE.x / GRID_SIZE.y }}
        >
            <Score
                className={styles.score}
                score={options.score}
                bestScore={options.bestScore}
            />

            <Grid>
                {options.gameState === GameState.ACTIVE && (
                    <>
                        <Snake
                            snake={snakeRef.current}
                            isInverted={
                                sideEffectsRef.current[
                                    SideEffect.IS_INVERTED_CONTROLS
                                ]
                            }
                            direction={prevDirectionRef.current}
                            speed={sideEffectsRef.current[SideEffect.SPEED]}
                        />

                        <Food food={foodRef.current} />
                    </>
                )}
            </Grid>
        </div>
    );
};
