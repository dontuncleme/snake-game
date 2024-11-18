import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Score } from "./Score";

describe("Score", () => {
    it("should render a list with default score and best score when no props are provided", () => {
        const { getByText } = render(
            <Score score={undefined} bestScore={undefined} />,
        );

        expect(getByText("Score: 0")).not.toBeNull();
        expect(getByText("Best Score: 0")).not.toBeNull();
    });

    it("should render the correct score and best score when props are provided", () => {
        const { getByText } = render(<Score score={10} bestScore={20} />);

        expect(getByText("Score: 10")).not.toBeNull();
        expect(getByText("Best Score: 20")).not.toBeNull();
    });
});
