import { FoodType } from "../enums/FoodType";
import { FoodSchema } from "../typings/FoodSchema";
import { SideEffect } from "./SideEffect";

export const FOOD_TYPE: Array<Omit<FoodSchema, "position">> = [
    { type: FoodType.CHERRY, icon: "🍒", points: 100 },
    {
        type: FoodType.MUSHROOM,
        icon: "🍄",
        points: 350,
        sideEffect: SideEffect.IS_INVERTED_CONTROLS,
    },
    {
        type: FoodType.PIZZA,
        icon: "🍕",
        points: 400,
        sideEffect: SideEffect.SPEED,
    },
];
