import { describe, expect, it } from "vitest";
import { LOCAL_STORAGE_KEY } from "../../consts/localStorage";
import { getStorageScore, saveStorageScore } from "./storageScore";

describe("storageScore", () => {
    it("should get a valid score from local storage when invoked", () => {
        const score = 100;

        localStorage.setItem(LOCAL_STORAGE_KEY, score.toString());

        expect(getStorageScore()).toBe(score);
    });

    it("should return 0 if no score stored", () => {
        expect(getStorageScore()).toBe(0);
    });

    it("should save a valid score to local storage when invoked", () => {
        const score = 100;

        saveStorageScore(score);

        expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(score.toString());
    });
});
