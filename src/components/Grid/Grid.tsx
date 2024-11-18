import { useMemo } from "react";
import cn from "classnames";
import {
    BOARD_HEIGHT,
    BOARD_WIDTH,
    GRID_CELL_SIZE,
    GRID_SIZE,
} from "../../consts/board";

import styles from "./Grid.module.css";

export interface GridProps {
    className?: string;
    children?: React.ReactNode;
}

export const Grid = ({ className, children }: GridProps) => {
    const lines = useMemo(() => {
        const res: React.ReactNode[] = [];

        for (let i = 0; i < GRID_SIZE.x; i++) {
            res.push(
                <rect
                    className={styles.gridLine}
                    width="2"
                    height={BOARD_HEIGHT}
                    x={i * GRID_CELL_SIZE - 1}
                    y={0}
                    key={"x" + i}
                />,
            );
        }

        for (let i = 0; i < GRID_SIZE.y; i++) {
            res.push(
                <rect
                    className={styles.gridLine}
                    height="2"
                    width={BOARD_WIDTH}
                    x={0}
                    y={i * GRID_CELL_SIZE - 1}
                    key={"y" + i}
                />,
            );
        }

        return res;
    }, []);

    return (
        <svg
            className={cn(styles.grid, className)}
            viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
        >
            {lines}

            {children}
        </svg>
    );
};
