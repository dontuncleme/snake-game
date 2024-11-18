import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Help } from "./Help";
import { FOOD_TYPE } from "../../consts/FoodType";

describe("Help", () => {
    it("should render FOOD_TYPE items in correct order", () => {
        const { container } = render(<Help />);
        const listItems = container.querySelectorAll("li");

        expect(listItems.length).toBe(FOOD_TYPE.length);

        FOOD_TYPE.forEach(({ icon, points }, i) => {
            expect(listItems[i].textContent).toContain(icon);
            expect(listItems[i].textContent).toContain(`${points} points`);
        });
    });
});
