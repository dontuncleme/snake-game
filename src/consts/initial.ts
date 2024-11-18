import { Direction } from "../enums/Direction";
import { PositionSchema } from "../typings/PositionSchema";
import { SideEffectsSchema } from "../typings/SideEffectsSchema";
import { GRID_SIZE } from "./board";
import { SideEffect } from "./SideEffect";

export const INITIAL_DIRECTION: Direction = Direction.DOWN;
export const INITIAL_SNAKE_POSITION: PositionSchema[] = [
    { x: Math.floor(GRID_SIZE.x / 2), y: 3 },
    { x: Math.floor(GRID_SIZE.x / 2), y: 2 },
    { x: Math.floor(GRID_SIZE.x / 2), y: 1 },
];
export const INITIAL_SIDE_EFFECTS: SideEffectsSchema = {
    [SideEffect.IS_INVERTED_CONTROLS]: false,
    [SideEffect.SPEED]: 6,
};
