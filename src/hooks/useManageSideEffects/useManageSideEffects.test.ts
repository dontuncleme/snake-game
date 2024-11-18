import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useManageSideEffects } from "./useManageSideEffects";
import { INITIAL_SIDE_EFFECTS } from "../../consts/initial";
import { SideEffect } from "../../consts/SideEffect";
import { FoodSchema } from "../../typings/FoodSchema";
import { SideEffectsSchema } from "../../typings/SideEffectsSchema";

describe("useManageSideEffects", () => {
    it("should initialize side effects with default values when no initial value is provided", () => {
        const { result } = renderHook(() => useManageSideEffects());

        expect(result.current.sideEffectsRef.current).toEqual(
            INITIAL_SIDE_EFFECTS,
        );
    });

    it("should update side effects correctly when provided with valid food schema", () => {
        const initial: SideEffectsSchema = {
            isInvertedControls: true,
            speed: 1,
        };
        const { result } = renderHook(() => useManageSideEffects(initial));

        const foodWithDirectionEffect = {
            sideEffect: SideEffect.IS_INVERTED_CONTROLS,
        } as unknown as FoodSchema;
        const foodWithSpeedEffect = {
            sideEffect: SideEffect.SPEED,
        } as unknown as FoodSchema;

        act(() => {
            result.current.applyFoodEffects(foodWithDirectionEffect);
            result.current.applyFoodEffects(foodWithDirectionEffect);
        });

        expect(
            result.current.sideEffectsRef.current[
                SideEffect.IS_INVERTED_CONTROLS
            ],
        ).toBeTruthy();

        act(() => {
            result.current.applyFoodEffects(foodWithSpeedEffect);
            result.current.applyFoodEffects(foodWithSpeedEffect);
        });

        expect(result.current.sideEffectsRef.current[SideEffect.SPEED]).toBe(3);

        act(() => {
            result.current.resetSideEffects();
        });

        expect(result.current.sideEffectsRef.current).toEqual(initial);
    });

    it("should update the single side effect when updated", () => {
        const { result } = renderHook(() => useManageSideEffects());

        act(() => {
            result.current.updateSingleSideEffect(
                SideEffect.IS_INVERTED_CONTROLS,
                true,
            );
            result.current.updateSingleSideEffect(SideEffect.SPEED, 100);
        });

        expect(result.current.sideEffectsRef.current).toEqual({
            isInvertedControls: true,
            speed: 100,
        });
    });
});
