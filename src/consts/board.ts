import { PositionSchema } from "../typings/PositionSchema";

export const GRID_SIZE: PositionSchema = { x: 31, y: 20 };

export const BOARD_WIDTH = 860;
export const BOARD_HEIGHT = BOARD_WIDTH / (GRID_SIZE.x / GRID_SIZE.y);

export const GRID_CELL_SIZE = BOARD_WIDTH / GRID_SIZE.x;
