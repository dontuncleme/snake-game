import { Direction } from "../../enums/Direction";

export const INVERTED_DIRECTION = Object.freeze({
    [Direction.UP]: Direction.DOWN,
    [Direction.DOWN]: Direction.UP,
    [Direction.LEFT]: Direction.RIGHT,
    [Direction.RIGHT]: Direction.LEFT,
});

export function getNormalizedDirection(
    direction: Direction,
    isInverted?: boolean,
) {
    return isInverted ? INVERTED_DIRECTION[direction] : direction;
}
