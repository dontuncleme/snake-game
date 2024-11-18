import cn from "classnames";
import { SideEffect } from "../../consts/SideEffect";
import { FOOD_TYPE } from "../../consts/FoodType";

import styles from "./Help.module.css";

export interface HelpProps {
    className?: string;
}

const SIDE_EFFECTS_DESCRIPTION: Record<SideEffect, string> = {
    [SideEffect.SPEED]: "move faster",
    [SideEffect.IS_INVERTED_CONTROLS]: "inverted controls",
};

export const Help = ({ className }: HelpProps) => {
    return (
        <ul className={cn(styles.help, className)}>
            {FOOD_TYPE.map(({ icon, points, sideEffect }, i) => (
                <li key={i}>
                    {icon} — {points} points
                    {sideEffect
                        ? ` (${SIDE_EFFECTS_DESCRIPTION[sideEffect]})`
                        : ""}
                </li>
            ))}
        </ul>
    );
};
