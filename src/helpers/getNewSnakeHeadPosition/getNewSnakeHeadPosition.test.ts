import { describe, expect, it } from "vitest";
import { getNewSnakeHeadPosition } from "./getNewSnakeHeadPosition";
import { Direction } from "../../enums/Direction";
import { PositionSchema } from "../../typings/PositionSchema";

describe("getNewSnakeHeadPosition", () => {
    it.each(Object.values(Direction))(
        "should move the snake's head in the correct direction",
        (direction) => {
            const snake: PositionSchema[] = [{ x: 5, y: 5 }];
            const snakeHead = getNewSnakeHeadPosition(snake, direction);

            expect(snakeHead).toMatchSnapshot();
        },
    );
});
