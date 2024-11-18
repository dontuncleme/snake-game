import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

beforeAll(() => {
    vi.spyOn(global.Math, "random").mockReturnValue(0.1);
});

afterAll(() => {
    vi.spyOn(global.Math, "random").mockRestore();
});

afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    cleanup();
});
