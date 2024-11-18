import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Snake } from "./Snake";
import { GRID_CELL_SIZE } from "../../consts/board";

describe("Snake", () => {
    it("should render a series of <rect> elements based on the snake array", () => {
        const snake = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
        ];
        const { container, getByTestId } = render(
            <svg>
                <Snake snake={snake} isInverted={false} />,
            </svg>,
        );
        const rects = container.querySelectorAll("rect");

        expect(rects).toHaveLength(snake.length);

        snake.forEach(({ x, y }, i) => {
            const rect = getByTestId(`snake_${i}`);

            expect(rect.getAttribute("x")).toBe(`${x * GRID_CELL_SIZE}`);
            expect(rect.getAttribute("y")).toBe(`${y * GRID_CELL_SIZE}`);
            expect(rect.getAttribute("width")).toBe(`${GRID_CELL_SIZE}`);
            expect(rect.getAttribute("height")).toBe(`${GRID_CELL_SIZE}`);
        });
    });
});
