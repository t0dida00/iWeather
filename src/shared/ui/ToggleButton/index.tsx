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
    const activeIndex = options.findIndex(option => option.value === value);
    const activeOption = options[activeIndex] ?? options[0];
    const nextOption = options[(activeIndex + 1) % options.length] ?? activeOption;

    return (
        <button
            type="button"
            onClick={() => onChange(nextOption.value)}
            className={styles.toggle}
            aria-label={`Switch to ${nextOption.label}`}
        >
            {activeOption.icon ?? activeOption.label}
        </button>
    );
}
