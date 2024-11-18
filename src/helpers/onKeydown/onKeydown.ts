import { Direction } from "../../enums/Direction";
import { GameState } from "../../enums/GameStatus";
import { getNormalizedDirection } from "../getNormalizedDirection/getNormalizedDirection";

const DIRECTION_KEYS = Object.freeze({
    [Direction.UP]: new Set(["KeyW", "ArrowUp"]),
    [Direction.DOWN]: new Set(["KeyS", "ArrowDown"]),
    [Direction.LEFT]: new Set(["KeyA", "ArrowLeft"]),
    [Direction.RIGHT]: new Set(["KeyD", "ArrowRight"]),
});

export function onKeydown(
    gameState: GameState,
    isInverted: boolean,
    changeDirection: (direction: Direction) => void,
    onResume: () => void,
) {
    return ({ code }: KeyboardEvent) => {
        // Checking if the game state is ACTIVE
        if (gameState === GameState.ACTIVE) {
            // Finding the new direction based on the pressed key
            const newDirection = Object.values(Direction).find((direction) => {
                return DIRECTION_KEYS[direction].has(code);
            });

            // If a valid direction key is pressed, it calls callback with the normalized direction
            if (newDirection) {
                changeDirection(
                    getNormalizedDirection(newDirection, isInverted),
                );
            }
        }

        // If the space bar is pressed, it calls callback
        if (code === "Space") {
            onResume();
        }
    };
}
