import cn from "classnames";
import { Button } from "../Button/Button";
import { Help } from "../Help/Help";
import { GameState } from "../../enums/GameStatus";

import styles from "./Nav.module.css";

export interface NavProps {
    className?: string;
    gameState: GameState;
    onClick: () => void;
}

const CONTENT: Record<
    GameState,
    Nullable<{ title?: string; subtitle?: string; action: string }>
> = {
    [GameState.NEW_GAME]: { title: "Snake", action: "Start Game" },
    [GameState.ACTIVE]: null,
    [GameState.PAUSED]: { subtitle: "Paused", action: "Continue" },
    [GameState.GAME_OVER]: { subtitle: "Game Over", action: "Restart Game" },
};

export const Nav = ({
    className,
    gameState = GameState.NEW_GAME,
    onClick,
}: NavProps) => {
    if (!CONTENT[gameState]) {
        return null;
    }

    return (
        <nav
            className={cn(styles.nav, className)}
            data-testid={`nav_${gameState}`}
        >
            {CONTENT[gameState].title && (
                <h1 className={styles.title}>{CONTENT[gameState].title}</h1>
            )}

            {CONTENT[gameState].subtitle && (
                <h2 className={styles.subtitle}>
                    {CONTENT[gameState].subtitle}
                </h2>
            )}

            <Help />

            <Button label={CONTENT[gameState].action} onClick={onClick} />
        </nav>
    );
};
