import { CurrentWeatherPanel, OtherCities, SevenDayForecast, TwentyFourHourForecast, TodaysHighlight, CurrentWeatherPanelMobile } from "../features/weather";
import { useCurrentWeather } from "../features/weather/hooks/useCurrentWeather";
import styles from "./DashboardPage.module.scss"
export function DashboardPage() {
    const { isError, isPending } = useCurrentWeather()

    if (isPending) {
        return <p>Loading weather...</p>
    }
    if (isError) {
        return <p>Error loading weather data.</p>
    }
    return (
        <div className={styles.container}>
            <section className={styles.sidebar}>
                <CurrentWeatherPanel />
                <OtherCities />
                <CurrentWeatherPanelMobile />
            </section>
            <section className={styles.mainContent}>
                <TodaysHighlight />
                <TwentyFourHourForecast />
                <SevenDayForecast />
                <OtherCities />
            </section>
        </div>

    )
}
