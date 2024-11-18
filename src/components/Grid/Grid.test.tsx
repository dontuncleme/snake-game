import { render } from "@testing-library/react";
import { Grid } from "./Grid";
import { describe, expect, it } from "vitest";
import { BOARD_HEIGHT, BOARD_WIDTH, GRID_SIZE } from "../../consts/board";

describe("Grid", () => {
    it("should render grid correctly", () => {
        const { container } = render(<Grid />);
        const svgElement = container.querySelector("svg");
        const gridLines = svgElement?.querySelectorAll("rect");

        expect(svgElement).not.toBeNull();
        expect(svgElement?.getAttribute("viewBox")).toBe(
            `0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`,
        );
        expect(gridLines?.length).toBe(GRID_SIZE.x + GRID_SIZE.y);
    });
});
