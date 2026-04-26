import type { MouseEventHandler, ReactNode, Key } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
    key?: Key;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    children: ReactNode;
};

export default function Button({
    onClick,
    className = "",
    children
}: ButtonProps) {
    const buttonClassName = className
        ? `${className}`
        : styles.button;

    return (
        <button
            type="button"
            onClick={onClick}
            className={buttonClassName}
        >
            {children}
        </button>
    );
}
