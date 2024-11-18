import { GRID_SIZE } from "../../consts/board";
import { FOOD_TYPE } from "../../consts/FoodType";
import { FoodSchema } from "../../typings/FoodSchema";
import { PositionSchema } from "../../typings/PositionSchema";
import { isSnakeSelfCollision } from "../isSnakeSelfCollision/isSnakeSelfCollision";

function getRandomValue(num: number) {
    return Math.floor(Math.random() * num);
}

export function getRandomFood(
    gridSize: PositionSchema = GRID_SIZE,
): FoodSchema {
    // Selecting a random food type
    const foodType = FOOD_TYPE[getRandomValue(FOOD_TYPE.length)];

    // Generating a random x and y position within the bounds of gridSize
    const position = {
        x: getRandomValue(gridSize.x),
        y: getRandomValue(gridSize.y),
    };

    return { ...foodType, position };
}

export function spawnFood(
    snake: PositionSchema[],
    gridSize: PositionSchema = GRID_SIZE,
) {
    // Generating a random food
    let randomFood = getRandomFood(gridSize);

    // Checking if the snake occupies the entire grid; if so, set the food position to an invalid location and return it
    if (snake.length >= gridSize.x * gridSize.y) {
        return null;
    }

    // Using a loop to ensure the food position does not collide with the snake's position
    while (isSnakeSelfCollision(snake, randomFood.position)) {
        randomFood = getRandomFood(gridSize);
    }

    return randomFood;
}
