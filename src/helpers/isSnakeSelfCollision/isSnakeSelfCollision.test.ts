import { describe, expect, it } from "vitest";
import { isSnakeSelfCollision } from "./isSnakeSelfCollision";
import { PositionSchema } from "../../typings/PositionSchema";

describe("isSnakeSelfCollision", () => {
    const positions: PositionSchema[] = [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
        { x: 5, y: 6 },
    ];

    it("should return true when a position matches one in the list", () => {
        const position: PositionSchema = { x: 3, y: 4 };

        expect(isSnakeSelfCollision(positions, position)).toBe(true);
    });

    it("should return false when no position matches any in the list", () => {
        const position: PositionSchema = { x: 7, y: 8 };

        expect(isSnakeSelfCollision(positions, position)).toBe(false);
    });

    it("should return false when the position is empty", () => {
        const position = {} as unknown as PositionSchema;

        expect(isSnakeSelfCollision(positions, position)).toBe(false);
    });

    it("should return false when the list of positions is empty", () => {
        const positions: PositionSchema[] = [];
        const position: PositionSchema = { x: 1, y: 2 };

        expect(isSnakeSelfCollision(positions, position)).toBe(false);
    });
});
