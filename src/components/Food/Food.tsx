import cn from "classnames";
import { GRID_CELL_SIZE } from "../../consts/board";
import { FoodSchema } from "../../typings/FoodSchema";

import styles from "./Food.module.css";

export interface FoodProps {
    className?: string;
    food: Nullable<FoodSchema>;
}

export const Food = ({ className, food }: FoodProps) => {
    if (!food) {
        return null;
    }

    return (
        <text
            className={cn(styles.food, className)}
            x={food.position.x * GRID_CELL_SIZE}
            y={food.position.y * GRID_CELL_SIZE}
            dy="0.65em"
            fontSize={GRID_CELL_SIZE}
            textAnchor="center"
            dominantBaseline="middle"
            data-side-effect={food.sideEffect}
            data-testid="food"
        >
            {food.icon}
        </text>
    );
};
