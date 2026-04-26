import Button from "../Button";
import styles from "./Toggle.module.scss";
import type { ReactNode } from "react";

type ToggleOption = {
    label: string;
    value: string;
    icon?: ReactNode;
};

type ToggleProps = {
    options: ToggleOption[];
    value: string;
    onChange: (value: string) => void;
};

export default function Toggle({
    options,
    value,
    onChange
}: ToggleProps) {

    return (
        <div className={styles.toggle}>
            {options.map(option => (
                <Button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={value === option.value ? styles.active : styles.button}
                >
                    {option.icon ?? option.label}
                </Button>
            ))}
        </div>
    );
}
