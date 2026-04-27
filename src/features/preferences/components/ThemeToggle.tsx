import { Moon, Sun } from "lucide-react";
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
                { label: "light", value: "light", icon: <Sun size={15} strokeWidth={4} /> },
                { label: "dark", value: "dark", icon: <Moon size={15} strokeWidth={4} /> }
            ]}
        />
    )
}
