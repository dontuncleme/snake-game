import cn from "classnames";

import styles from "./Score.module.css";

export interface ScoreProps {
    className?: string;
    score: Optional<number>;
    bestScore: Optional<number>;
}

export const Score = ({ className, score = 0, bestScore = 0 }: ScoreProps) => {
    return (
        <ul className={cn(styles.score, className)} data-testid="score">
            <li data-testid="score_value" data-value={score}>
                Score: {score}
            </li>
            <li data-testid="bestScore_value" data-value={bestScore}>
                Best Score: {bestScore}
            </li>
        </ul>
    );
};
