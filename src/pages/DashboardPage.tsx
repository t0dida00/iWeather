import { CurrentWeatherPanel } from "../features/weather";
import styles from "./DashboardPage.module.scss"
export function DashboardPage() {
    return (
        <div className={styles.container}>
            <CurrentWeatherPanel />
        </div>

    )
}
