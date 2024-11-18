import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GameState } from "../../enums/GameStatus";
import { Nav } from "./Nav";

describe("Nav", () => {
    const onClick = vi.fn();
    it("should return null when content for ACTIVE gameState is null", () => {
        const { container } = render(
            <Nav gameState={GameState.ACTIVE} onClick={onClick} />,
        );

        expect(container.firstChild).toBeNull();
    });

    it("should call onClick handler when button is clicked", () => {
        const { getByTestId } = render(
            <Nav gameState={GameState.NEW_GAME} onClick={onClick} />,
        );
        const button = getByTestId("button");

        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should use default GameState.NEW when no gameState is provided", () => {
        const { container } = render(
            <Nav
                gameState={undefined as unknown as GameState}
                onClick={onClick}
            />,
        );

        expect(container.querySelector("h1")?.textContent).toBe("Snake");
        expect(container.querySelector("button")?.textContent).toBe(
            "Start Game",
        );
    });

    it("should display subtitle and action button when GameState is PAUSED", () => {
        const { container } = render(
            <Nav gameState={GameState.PAUSED} onClick={onClick} />,
        );

        expect(container.querySelector("h2")?.textContent).toBe("Paused");
        expect(container.querySelector("button")?.textContent).toBe("Continue");
    });

    // Displays action button for GameState.GAME_OVER
    it('should display "Restart Game" button when gameState is GAME_OVER', () => {
        const { container } = render(
            <Nav gameState={GameState.GAME_OVER} onClick={onClick} />,
        );

        expect(container.querySelector("h2")?.textContent).toBe("Game Over");
        expect(container.querySelector("button")?.textContent).toBe(
            "Restart Game",
        );
    });
});
