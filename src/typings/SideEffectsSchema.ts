import { SideEffect } from "../consts/SideEffect";

export interface SideEffectsSchema {
    [SideEffect.IS_INVERTED_CONTROLS]: boolean;
    [SideEffect.SPEED]: number;
}
