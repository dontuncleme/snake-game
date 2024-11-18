import { Direction } from "../../enums/Direction";
import { FoodSchema } from "../../typings/FoodSchema";
import { PositionSchema } from "../../typings/PositionSchema";
import { isCollision } from "../isCollision/isCollision";
import { isSnakeCollision } from "../isSnakeCollision/isSnakeCollision";
import { getNewSnakeHeadPosition } from "../getNewSnakeHeadPosition/getNewSnakeHeadPosition";

export function moveSnake(
    snake: PositionSchema[],
    food: Nullable<FoodSchema>,
    direction: Direction,
    onCollision: () => void,
    onFoodCollision: (food: FoodSchema) => void,
) {
    // Cloning the current snake's position
    const copySnake = structuredClone(snake);
    // Calculating the new head position based on the given direction
    const snakeHead = getNewSnakeHeadPosition(copySnake, direction);

    // If a collision is detected, executing callback and exit
    if (isSnakeCollision(copySnake, snakeHead)) {
        onCollision();

        return;
    }

    // Adding the new head position to the snake
    copySnake.unshift(snakeHead);

    // If food is eaten, executing callback; otherwise, removing the snake's tail
    if (food && isCollision(snakeHead, food.position)) {
        onFoodCollision(food);
    } else {
        copySnake.pop();
    }

    return copySnake;
}
