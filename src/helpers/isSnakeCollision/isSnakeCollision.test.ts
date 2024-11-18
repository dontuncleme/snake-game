import { describe, expect, it } from "vitest";
import { isSnakeCollision } from "./isSnakeCollision";
import { PositionSchema } from "../../typings/PositionSchema";

describe("isSnakeCollision", () => {
    it("should return true when snake head is out of grid bounds", () => {
        const snake: PositionSchema[] = [{ x: 5, y: 5 }];
        const snakeHead: PositionSchema = { x: -1, y: 5 };

        expect(isSnakeCollision(snake, snakeHead)).toBe(true);
    });

    it("should return true when snake head overlaps with snake body", () => {
        const snake: PositionSchema[] = [
            { x: 5, y: 5 },
            { x: 6, y: 5 },
            { x: 7, y: 5 },
        ];
        const snakeHead: PositionSchema = { x: 6, y: 5 };

        expect(isSnakeCollision(snake, snakeHead)).toBe(true);
    });

    it("should return false when snake head is within grid and not overlapping", () => {
        const snake: PositionSchema[] = [
            { x: 5, y: 5 },
            { x: 6, y: 5 },
        ];
        const snakeHead: PositionSchema = { x: 7, y: 5 };

        expect(isSnakeCollision(snake, snakeHead)).toBe(false);
    });

    it("should return false when snake body is empty", () => {
        const snake: PositionSchema[] = [];
        const snakeHead: PositionSchema = { x: 5, y: 5 };

        expect(isSnakeCollision(snake, snakeHead)).toBe(false);
    });
});
