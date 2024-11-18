import { GameState } from "../enums/GameStatus";

export interface OptionsSchema {
    score: number;
    bestScore: number;
    gameState: GameState;
}
