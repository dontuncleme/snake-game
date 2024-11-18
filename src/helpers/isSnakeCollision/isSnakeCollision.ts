import { GRID_SIZE } from "../../consts/board";
import { PositionSchema } from "../../typings/PositionSchema";
import { isSnakeSelfCollision } from "../isSnakeSelfCollision/isSnakeSelfCollision";

export function isSnakeCollision(
    snake: PositionSchema[],
    snakeHead: PositionSchema,
) {
    return (
        // Checking intersection with grid edges
        snakeHead.x < 0 ||
        snakeHead.x >= GRID_SIZE.x ||
        snakeHead.y < 0 ||
        snakeHead.y >= GRID_SIZE.y ||
        // Checking the intersection of the head with the body part
        isSnakeSelfCollision(snake, snakeHead)
    );
}
