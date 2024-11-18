import { describe, expect, it } from "vitest";
import { isCollision } from "./isCollision";

describe("isCollision", () => {
    it("should return true when positions match", () => {
        expect(isCollision({ x: 5, y: 5 }, { x: 5, y: 5 })).toBeTruthy();
    });

    it("should return false when do not match", () => {
        expect(isCollision({ x: 5, y: 5 }, { x: 3, y: 4 })).toBeFalsy();
    });
});
