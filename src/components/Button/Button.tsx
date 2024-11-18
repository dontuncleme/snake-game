import cn from "classnames";

import styles from "./Button.module.css";

export type ButtonAttributes = JSX.IntrinsicElements["button"];

export interface ButtonProps extends ButtonAttributes {
    className?: string;
    label: string;
}

export const Button = ({ className, label, ...otherProps }: ButtonProps) => {
    return (
        <button
            {...otherProps}
            className={cn(styles.button, className)}
            data-testid="button"
        >
            {label}
        </button>
    );
};
