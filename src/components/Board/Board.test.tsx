import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GameState } from "../../enums/GameStatus";
import { OptionsSchema } from "../../typings/OptionsSchema";
import { Board } from "./Board";

describe("Board", () => {
    const options: OptionsSchema = {
        gameState: GameState.ACTIVE,
        score: 0,
        bestScore: 0,
    };

    const onStartGame = vi.fn();
    const onResumeGame = vi.fn();
    const onCollision = vi.fn();
    const onFoodCollision = vi.fn();

    it("should hide the body of snake and food between active and paused game state", () => {
        const { queryByTestId } = render(
            <Board
                options={{ ...options, gameState: GameState.PAUSED }}
                onStartGame={onStartGame}
                onResumeGame={onResumeGame}
                onCollision={onCollision}
                onFoodCollision={onFoodCollision}
            />,
        );

        expect(queryByTestId("snake_0")).toBeNull();
        expect(queryByTestId("snake_1")).toBeNull();
        expect(queryByTestId("snake_2")).toBeNull();
        expect(queryByTestId("food")).toBeNull();
    });
});
