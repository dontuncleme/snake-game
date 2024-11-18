import cn from "classnames/bind";
import { PositionSchema } from "../../typings/PositionSchema";
import { GRID_CELL_SIZE } from "../../consts/board";

import styles from "./Snake.module.css";
import { Direction } from "../../enums/Direction";

export interface SnakeProps {
    className?: string;
    snake: PositionSchema[];
    isInverted?: boolean;
    direction?: Direction;
    speed?: number;
}

const cx = cn.bind(styles);

export const Snake = ({
    className,
    snake,
    isInverted,
    direction,
    speed,
}: SnakeProps) => {
    return (
        <>
            {snake.map(({ x, y }, i) => (
                <rect
                    className={cx(styles.snake, { inverted: isInverted }, [
                        className,
                    ])}
                    width={GRID_CELL_SIZE}
                    height={GRID_CELL_SIZE}
                    x={x * GRID_CELL_SIZE}
                    y={y * GRID_CELL_SIZE}
                    rx="8px"
                    ry="8px"
                    data-direction={direction}
                    data-speed={speed}
                    data-inverted-controls={isInverted}
                    data-testid={`snake_${i}`}
                    key={i}
                />
            ))}
        </>
    );
};
