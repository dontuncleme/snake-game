import { FoodType } from "../enums/FoodType";
import { SideEffect } from "../consts/SideEffect";
import { PositionSchema } from "./PositionSchema";

export interface FoodSchema {
    type: FoodType;
    icon: string;
    points: number;
    position: PositionSchema;
    sideEffect?: SideEffect;
}
