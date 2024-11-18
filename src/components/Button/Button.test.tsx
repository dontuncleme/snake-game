import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
    it("should render a button with the provided label", () => {
        const { getByTestId } = render(<Button label="Click Me" />);
        const buttonElement = getByTestId("button");

        expect(buttonElement).not.toBeNull();
        expect(buttonElement.textContent).toBe("Click Me");
    });

    it("should apply additional class names when className prop is provided", () => {
        const { getByTestId } = render(
            <Button className="extra-class" label="Click Me" />,
        );
        const buttonElement = getByTestId("button");
        expect(buttonElement.getAttribute("class")).contain("extra-class");
    });

    it("should render a button with no text when label is undefined", () => {
        const { getByTestId } = render(
            <Button label={undefined as unknown as string} />,
        );
        const buttonElement = getByTestId("button");

        expect(buttonElement).not.toBeNull();
        expect(buttonElement.textContent).toBe("");
    });
});
