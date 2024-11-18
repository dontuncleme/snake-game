import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FoodSchema } from "../../typings/FoodSchema";
import { Food } from "./Food";
import { GRID_CELL_SIZE } from "../../consts/board";

describe("Food", () => {
    it("should render a text element with correct attributes when valid food data is provided", () => {
        const food = {
            position: { x: 2, y: 3 },
            icon: "🍎",
        } as unknown as FoodSchema;

        const { container } = render(
            <svg>
                <Food food={food} />
            </svg>,
        );
        const textElement = container.querySelector("text");

        expect(textElement).not.toBeNull();
        expect(textElement?.getAttribute("x")).toBe(
            (food.position.x * GRID_CELL_SIZE).toString(),
        );
        expect(textElement?.getAttribute("y")).toBe(
            (food.position.y * GRID_CELL_SIZE).toString(),
        );
        expect(textElement?.textContent).toBe(food.icon);
    });

    it("should return null when food data is undefined", () => {
        const { container } = render(
            <Food food={undefined as unknown as FoodSchema} />,
        );

        expect(container.firstChild).toBeNull();
    });
});
