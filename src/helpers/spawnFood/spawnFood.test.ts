import { describe, expect, it } from "vitest";
import { PositionSchema } from "../../typings/PositionSchema";
import { getRandomFood, spawnFood } from "./spawnFood";

describe("getRandomFood", () => {
    it("should return a valid FoodSchema object with correct properties", () => {
        const food = getRandomFood();

        expect(food).toHaveProperty("type");
        expect(food).toHaveProperty("icon");
        expect(food).toHaveProperty("points");
        expect(food).toHaveProperty("position");
        expect(food.position).toHaveProperty("x");
        expect(food.position).toHaveProperty("y");
    });
});

describe("spawnFood", () => {
    it("should return a food item not colliding with the snake", () => {
        const snake: PositionSchema[] = [{ x: 0, y: 1 }];

        const food = spawnFood(snake);

        expect(food?.position).toEqual({ x: 3, y: 2 });
    });

    it("should return a food item when the snake is longer than board", () => {
        const snake: PositionSchema[] = [{ x: 0, y: 0 }];

        const food = spawnFood(snake, { x: 1, y: 1 });

        expect(food).toBeNull();
    });
});
