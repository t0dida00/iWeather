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
                { label: "°C", value: "celsius" },
                { label: "°F", value: "fahrenheit" }
            ]}
        />
    )
}
