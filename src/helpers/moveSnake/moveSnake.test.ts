import { describe, expect, it, vi } from "vitest";
import { Direction } from "../../enums/Direction";
import { moveSnake } from "./moveSnake";
import { FoodSchema } from "../../typings/FoodSchema";
import { PositionSchema } from "../../typings/PositionSchema";

describe("moveSnake", () => {
    const onCollision = vi.fn();
    const onFoodCollision = vi.fn();

    it("should move the snake in the specified direction when there are no collisions", () => {
        const initialSnake: PositionSchema[] = [
            { x: 2, y: 2 },
            { x: 2, y: 3 },
        ];
        const food = {
            position: { x: 5, y: 5 },
        } as unknown as FoodSchema;

        const newSnake = moveSnake(
            initialSnake,
            food,
            Direction.UP,
            onCollision,
            onFoodCollision,
        );

        expect(newSnake).toEqual([
            { x: 2, y: 1 },
            { x: 2, y: 2 },
        ]);
        expect(onCollision).not.toHaveBeenCalled();
        expect(onFoodCollision).not.toHaveBeenCalled();
    });

    it("should grow the snake when it collides with food", () => {
        const initialSnake: PositionSchema[] = [
            { x: 2, y: 2 },
            { x: 2, y: 3 },
        ];
        const food = {
            position: { x: 2, y: 1 },
        } as unknown as FoodSchema;

        const newSnake = moveSnake(
            initialSnake,
            food,
            Direction.UP,
            onCollision,
            onFoodCollision,
        );

        expect(newSnake).toEqual([
            { x: 2, y: 1 },
            { x: 2, y: 2 },
            { x: 2, y: 3 },
        ]);
        expect(onCollision).not.toHaveBeenCalled();
        expect(onFoodCollision).toHaveBeenCalledWith(food);
    });

    it("should not grow the snake when there is no food collision", () => {
        const initialSnake: PositionSchema[] = [
            { x: 2, y: 2 },
            { x: 2, y: 3 },
        ];
        const food = {
            position: { x: 5, y: 5 },
        } as unknown as FoodSchema;

        const newSnake = moveSnake(
            initialSnake,
            food,
            Direction.UP,
            onCollision,
            onFoodCollision,
        );

        expect(newSnake).toEqual([
            { x: 2, y: 1 },
            { x: 2, y: 2 },
        ]);
        expect(onCollision).not.toHaveBeenCalled();
        expect(onFoodCollision).not.toHaveBeenCalled();
    });

    it("should return the original snake when it collides with itself", () => {
        const initialSnake: PositionSchema[] = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
        ];
        const food = {
            position: { x: 5, y: 5 },
        } as unknown as FoodSchema;

        const newSnake = moveSnake(
            initialSnake,
            food,
            Direction.LEFT,
            onCollision,
            onFoodCollision,
        );

        expect(newSnake).toBeUndefined();
        expect(onCollision).toHaveBeenCalled();
        expect(onFoodCollision).not.toHaveBeenCalled();
    });

    it("should call onCollisionHandler when snake collides with wall", () => {
        const initialSnake: PositionSchema[] = [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
        ];
        const food = {
            position: { x: 5, y: 5 },
        } as unknown as FoodSchema;

        const newSnake = moveSnake(
            initialSnake,
            food,
            Direction.LEFT,
            onCollision,
            onFoodCollision,
        );

        expect(newSnake).toBeUndefined();
        expect(onCollision).toHaveBeenCalled();
        expect(onFoodCollision).not.toHaveBeenCalled();
    });
});
