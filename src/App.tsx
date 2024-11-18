import { useCallback, useState } from "react";
import { Board } from "./components/Board/Board";
import { Nav } from "./components/Nav/Nav";
import { GameState } from "./enums/GameStatus";
import {
    getStorageScore,
    saveStorageScore,
} from "./helpers/storageScore/storageScore";
import { FoodSchema } from "./typings/FoodSchema";
import { OptionsSchema } from "./typings/OptionsSchema";

function App() {
    const [options, setOptions] = useState<OptionsSchema>(() => ({
        score: 0,
        bestScore: getStorageScore(),
        gameState: GameState.NEW_GAME,
    }));

    const onStartGameHandler = useCallback(() => {
        if (options.gameState === GameState.GAME_OVER) {
            saveStorageScore(options.bestScore);
        }

        setOptions((prev) => ({
            ...prev,
            score: 0,
            gameState: GameState.ACTIVE,
        }));
    }, [options.bestScore, options.gameState]);

    const onResumeGameHandler = useCallback(() => {
        setOptions((prev) => ({
            ...prev,
            gameState:
                prev.gameState === GameState.ACTIVE
                    ? GameState.PAUSED
                    : GameState.ACTIVE,
        }));
    }, []);

    const onCollisionHandler = useCallback(() => {
        setOptions((prev) => ({
            ...prev,
            bestScore:
                prev.bestScore < prev.score ? prev.score : prev.bestScore,
            gameState: GameState.GAME_OVER,
        }));
    }, []);

    const onFoodCollisionHandler = useCallback((food: FoodSchema) => {
        setOptions((prev) => ({ ...prev, score: prev.score + food.points }));
    }, []);

    return (
        <>
            <Nav gameState={options.gameState} onClick={onStartGameHandler} />

            <Board
                options={options}
                onStartGame={onStartGameHandler}
                onResumeGame={onResumeGameHandler}
                onCollision={onCollisionHandler}
                onFoodCollision={onFoodCollisionHandler}
            />
        </>
    );
}

export default App;
