import { describe, expect, it } from "vitest";
import { Direction } from "../../enums/Direction";
import {
    getNormalizedDirection,
    INVERTED_DIRECTION,
} from "./getNormalizedDirection";

describe("getNormalizedDirection", () => {
    it.each(Object.values(Direction))(
        "should return the same direction when isInverted is false or undefined",
        (value) => {
            expect(getNormalizedDirection(value)).toBe(value);
            expect(getNormalizedDirection(Direction.UP, false)).toBe(
                Direction.UP,
            );
            expect(getNormalizedDirection(Direction.LEFT, undefined)).toBe(
                Direction.LEFT,
            );
        },
    );

    it.each(Object.values(Direction))(
        "should return the inverted direction when isInverted is true",
        (value) => {
            expect(getNormalizedDirection(value, true)).toBe(
                INVERTED_DIRECTION[value],
            );
        },
    );
});
