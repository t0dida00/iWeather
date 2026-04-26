import styles from "./Toggle.module.scss";

type ToggleOption = {
    label: string;
    value: string;
    imgSrc?: string;
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
                <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={
                        value === option.value
                            ? styles.active
                            : styles.button
                    }
                >
                    {option.imgSrc ? <img src={option.imgSrc} alt={option.label} /> : option.label}
                </button>
            ))}
        </div>
    );
}