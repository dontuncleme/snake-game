import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { FOOD_TYPE } from "./consts/FoodType";
import { INITIAL_DIRECTION, INITIAL_SIDE_EFFECTS } from "./consts/initial";
import { SideEffect } from "./consts/SideEffect";
import { GameState } from "./enums/GameStatus";
import { spawnFood } from "./helpers/spawnFood/spawnFood";
import {
    getStorageScore,
    saveStorageScore,
} from "./helpers/storageScore/storageScore";

describe("App", () => {
    vi.mock("./helpers/storageScore/storageScore", { spy: true });
    vi.mock("./helpers/spawnFood/spawnFood", { spy: true });

    it("should set game state to active when starting a new game", async () => {
        const { getByTestId, queryByTestId } = render(<App />);

        expect(getStorageScore).toBeCalled();
        expect(queryByTestId(`nav_${GameState.NEW_GAME}`)).not.toBeNull();

        fireEvent.click(getByTestId("button"));

        expect(queryByTestId(`nav_${GameState.NEW_GAME}`)).toBeNull();
        expect(getByTestId("score_value").dataset.value).toBe("0");
    });

    it("should toggle game state between active and paused when resume handler is called", () => {
        const { getByTestId, queryByTestId } = render(<App />);

        fireEvent.click(getByTestId("button"));

        fireEvent.keyDown(document, { code: "Space" });
        expect(queryByTestId(`nav_${GameState.PAUSED}`)).not.toBeNull();

        fireEvent.keyDown(document, { code: "Space" });
        expect(queryByTestId(`nav_${GameState.PAUSED}`)).toBeNull();
    });

    it("should set game state to game over on collision and restart game", async () => {
        vi.mocked(spawnFood).mockReturnValue({
            ...FOOD_TYPE[0],
            position: { x: 0, y: 0 },
        });

        const { getByTestId, queryByTestId } = render(<App />);

        fireEvent.click(getByTestId("button"));

        await waitFor(
            () => {
                expect(
                    queryByTestId(`nav_${GameState.GAME_OVER}`),
                ).not.toBeNull();
            },
            { timeout: 5000 },
        );

        expect(getByTestId("score_value").dataset.value).toBe("0");
        expect(getByTestId("bestScore_value").dataset.value).toBe("0");

        fireEvent.click(getByTestId("button"));

        expect(saveStorageScore).toBeCalled();
        expect(queryByTestId(`nav_${GameState.GAME_OVER}`)).toBeNull();
    });

    it("should increase score by food and save best score", async () => {
        vi.mocked(spawnFood).mockReturnValue({
            ...FOOD_TYPE[0],
            position: { x: 15, y: 19 },
        });

        const { getByTestId, queryByTestId } = render(<App />);

        fireEvent.click(getByTestId("button"));

        await waitFor(
            () => {
                expect(
                    queryByTestId(`nav_${GameState.GAME_OVER}`),
                ).not.toBeNull();
            },
            { timeout: 5000 },
        );

        expect(getByTestId("score_value").dataset.value).not.toBe("0");
        expect(getByTestId("bestScore_value").dataset.value).not.toBe("0");

        fireEvent.keyDown(document, { code: "Space" });

        expect(saveStorageScore).toBeCalled();
        expect(queryByTestId(`nav_${GameState.GAME_OVER}`)).toBeNull();
    });

    it("should change direction on keydown after food collision", async () => {
        vi.mocked(spawnFood).mockReturnValue({
            ...FOOD_TYPE[0],
            position: { x: 15, y: 5 },
        });

        const { getByTestId } = render(<App />);

        fireEvent.click(getByTestId("button"));

        expect(getByTestId("snake_0").dataset.direction).toBe(
            INITIAL_DIRECTION,
        );

        await waitFor(
            () => {
                expect(getByTestId("score_value").dataset.value).not.toBe("0");
            },
            { timeout: 5000 },
        );

        fireEvent.keyDown(document, { code: "ArrowLeft" });

        await new Promise((r) => setTimeout(r, 300));

        expect(getByTestId("snake_0").dataset.direction).toBe("left");
    });

    it("should invert direction on keydown after food collision with inverted controls side effect and return back after some time", async () => {
        vi.mock("./consts/controls", () => ({
            __esModule: true,
            INVERTED_CONTROLS_TIME: 300,
        }));
        vi.mocked(spawnFood).mockReturnValue({
            ...FOOD_TYPE[0],
            position: { x: 15, y: 5 },
            sideEffect: SideEffect.IS_INVERTED_CONTROLS,
        });

        const { getByTestId } = render(<App />);

        fireEvent.click(getByTestId("button"));

        expect(getByTestId("snake_0").dataset["inverted-controls"]).toBe(
            INITIAL_SIDE_EFFECTS[SideEffect.IS_INVERTED_CONTROLS].toString(),
        );
        expect(getByTestId("food").dataset["side-effect"]).toBe(
            SideEffect.IS_INVERTED_CONTROLS,
        );

        await waitFor(
            () => {
                expect(getByTestId("score_value").dataset.value).not.toBe("0");
            },
            { timeout: 5000 },
        );

        fireEvent.keyDown(document, { code: "ArrowLeft" });

        await new Promise((r) => setTimeout(r, 300));

        expect(getByTestId("snake_0").dataset.direction).toBe("right");
        expect(getByTestId("snake_0").dataset["inverted-controls"]).toBe(
            "true",
        );

        await new Promise((r) => setTimeout(r, 300));

        expect(getByTestId("snake_0").dataset["inverted-controls"]).toBe(
            INITIAL_SIDE_EFFECTS[SideEffect.IS_INVERTED_CONTROLS].toString(),
        );
    });

    it("should increase speed after food collision with speed side effect", async () => {
        vi.mocked(spawnFood).mockReturnValue({
            ...FOOD_TYPE[0],
            position: { x: 15, y: 5 },
            sideEffect: SideEffect.SPEED,
        });

        const { getByTestId } = render(<App />);

        fireEvent.click(getByTestId("button"));

        expect(getByTestId("snake_0").dataset.speed).toBe(
            INITIAL_SIDE_EFFECTS[SideEffect.SPEED].toString(),
        );
        expect(getByTestId("food").dataset["side-effect"]).toBe(
            SideEffect.SPEED,
        );

        await waitFor(
            () => {
                expect(getByTestId("score_value").dataset.value).not.toBe("0");
            },
            { timeout: 5000 },
        );

        await new Promise((r) => setTimeout(r, 300));

        expect(getByTestId("snake_0").dataset.speed).toBe(
            (INITIAL_SIDE_EFFECTS[SideEffect.SPEED] + 1).toString(),
        );
    });
});
