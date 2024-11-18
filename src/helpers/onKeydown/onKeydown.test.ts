import { describe, expect, it, vi } from "vitest";
import { GameState } from "../../enums/GameStatus";
import { onKeydown } from "./onKeydown";

describe("onKeydown", () => {
    it("should change direction when a valid direction key is pressed and game is active", () => {
        const changeDirection = vi.fn();
        const onResume = vi.fn();

        const handleKeydown = onKeydown(
            GameState.ACTIVE,
            false,
            changeDirection,
            onResume,
        );

        handleKeydown({ code: "ArrowDown" } as unknown as KeyboardEvent);

        expect(changeDirection).toHaveBeenCalledWith("down");
        expect(onResume).not.toHaveBeenCalled();
    });

    it("should change direction (inverted) when a valid direction key is pressed and game is active", () => {
        const changeDirection = vi.fn();
        const onResume = vi.fn();

        const handleKeydown = onKeydown(
            GameState.ACTIVE,
            true,
            changeDirection,
            onResume,
        );

        handleKeydown({ code: "ArrowDown" } as unknown as KeyboardEvent);

        expect(changeDirection).toHaveBeenCalledWith("up");
        expect(onResume).not.toHaveBeenCalled();
    });

    it("shouldn't change direction when a valid direction key is pressed and game isn't active", () => {
        const changeDirection = vi.fn();
        const onResume = vi.fn();

        const handleKeydown = onKeydown(
            GameState.GAME_OVER,
            false,
            changeDirection,
            onResume,
        );

        handleKeydown({ code: "ArrowDown" } as unknown as KeyboardEvent);

        expect(changeDirection).not.toHaveBeenCalledWith("down");
        expect(onResume).not.toHaveBeenCalled();
    });

    it("should resume game when space key is pressed", () => {
        const changeDirection = vi.fn();
        const onResume = vi.fn();

        const handleKeydown = onKeydown(
            GameState.ACTIVE,
            false,
            changeDirection,
            onResume,
        );

        handleKeydown({ code: "Space" } as unknown as KeyboardEvent);

        expect(changeDirection).not.toHaveBeenCalledWith("space");
        expect(onResume).toHaveBeenCalled();
    });
});
