import type { CSSProperties, ReactNode } from "react";
import styles from "./Card.module.scss";

type SizeValue = number | string;

type CardProps = {
    background?: string;
    borderRadius?: SizeValue;
    padding?: SizeValue;
    className?: string;
    width?: SizeValue;
    height?: SizeValue;
    children?: ReactNode;
    borderColor?: SizeValue;
    borderWidth?: SizeValue;
};

const toCssValue = (value: SizeValue) =>
    typeof value === "number" ? `${value}px` : value;

export default function Card({
    background,
    borderRadius = "16px",
    padding = 12,
    className = "",
    width = 150,
    height = 150,
    borderColor,
    borderWidth = 1,
    children
}: CardProps) {
    const cardClassName = className
        ? `${styles.card} ${className}`
        : styles.card;

    const cardStyle: CSSProperties = {
        borderRadius: toCssValue(borderRadius),
        padding: toCssValue(padding),
        width: toCssValue(width),
        height: toCssValue(height),
        borderWidth: toCssValue(borderWidth),
        ...(background ? { background } : {}),
        ...(borderColor ? { borderColor: toCssValue(borderColor) } : {})
    };

    return (
        <div className={cardClassName} style={cardStyle}>
            {children}
        </div>
    );
}
