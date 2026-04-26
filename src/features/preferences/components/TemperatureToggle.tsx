import Toggle from "../../../shared/ui/ToggleButton";
import { useTemp } from "../hooks/useTemp";
import type { TempUnit } from "../types";
export default function TemperatureToggle() {

    const {
        temp,
        toggleTemp
    } = useTemp();

    return (
        <Toggle
            value={temp}
            onChange={(value) => toggleTemp(value as TempUnit)}
            options={[
                { label: "Celsius", value: "celsius", imgSrc: "/assets/sun.png" },
                { label: "Fahrenheit", value: "fahrenheit", imgSrc: "/assets/moon.png" }
            ]}
        />
    )
}