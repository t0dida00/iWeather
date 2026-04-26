import Toggle from "../../../shared/ui/ToggleButton";
import { useTheme } from "../hooks/useTheme";
import type { Theme } from "../types";
export default function ThemeToggle() {

    const {
        theme,
        toggleTheme
    } = useTheme();

    return (
        <Toggle
            value={theme}
            onChange={(value) => toggleTheme(value as Theme)}
            options={[
                { label: "light", value: "light", imgSrc: "/assets/sun.png" },
                { label: "dark", value: "dark", imgSrc: "/assets/moon.png" }
            ]}
        />
    )
}