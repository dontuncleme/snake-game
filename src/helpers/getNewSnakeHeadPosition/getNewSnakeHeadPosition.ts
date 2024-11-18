import { Direction } from "../../enums/Direction";
import { PositionSchema } from "../../typings/PositionSchema";

export function getNewSnakeHeadPosition(
    snake: PositionSchema[],
    direction: Direction,
) {
    const snakeHead = { ...snake[0] };

    // Depending on the direction, it updates the x or y coordinate of the snake's head
    switch (direction) {
        case Direction.UP:
            snakeHead.y -= 1;
            break;
        case Direction.DOWN:
            snakeHead.y += 1;
            break;
        case Direction.LEFT:
            snakeHead.x -= 1;
            break;
        case Direction.RIGHT:
            snakeHead.x += 1;
            break;
    }

    return snakeHead;
}
