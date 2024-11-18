import { useRef } from "react";
import { INITIAL_SIDE_EFFECTS } from "../../consts/initial";
import { SideEffect } from "../../consts/SideEffect";
import { FoodSchema } from "../../typings/FoodSchema";
import { SideEffectsSchema } from "../../typings/SideEffectsSchema";

export function useManageSideEffects(
    initial: SideEffectsSchema = INITIAL_SIDE_EFFECTS,
) {
    const sideEffectsRef = useRef<SideEffectsSchema>({ ...initial });

    // Resetting the side effects to their initial state
    function resetSideEffects() {
        sideEffectsRef.current = { ...initial };
    }

    // Updating a specific side effect by key and value
    function updateSingleSideEffect<T extends keyof SideEffectsSchema>(
        key: T,
        value: SideEffectsSchema[T],
    ) {
        sideEffectsRef.current[key] = value;
    }

    // Applying side effects based on a FoodSchema object
    function applyFoodEffects(food: FoodSchema) {
        switch (food.sideEffect) {
            case SideEffect.IS_INVERTED_CONTROLS:
                return updateSingleSideEffect(food.sideEffect, true);
            case SideEffect.SPEED:
                return updateSingleSideEffect(
                    food.sideEffect,
                    ++sideEffectsRef.current[SideEffect.SPEED],
                );
        }
    }

    return {
        sideEffectsRef,
        updateSingleSideEffect,
        applyFoodEffects,
        resetSideEffects,
    };
}
