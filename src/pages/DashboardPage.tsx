import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CurrentWeatherPanel, OtherCities, SevenDayForecast, TwentyFourHourForecast, TodaysHighlight } from "../features/weather";
import { useCurrentWeather } from "../features/weather/hooks/useCurrentWeather";
import Card from "../shared/ui/Card";
import styles from "./DashboardPage.module.scss"

export function DashboardPage() {
    const { isError, isPending } = useCurrentWeather()
    const currentWeatherRef = useRef<HTMLDivElement>(null)
    const [showCompactSummary, setShowCompactSummary] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            const currentWeather = currentWeatherRef.current

            if (!currentWeather) {
                return
            }

            const isMobile = window.innerWidth < 768
            const currentWeatherBottom = currentWeather.getBoundingClientRect().bottom

            setShowCompactSummary(isMobile && currentWeatherBottom <= -10)
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("resize", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleScroll)
        }
    }, [])

    if (isPending) {
        return <p>Loading weather...</p>
    }
    if (isError) {
        return <p>Error loading weather data.</p>
    }
    return (
        <>
            <div className={styles.pageActions}>
                <button
                    aria-label="Go back"
                    className={styles.backButton}
                    onClick={() => navigate("/cities")}
                    title="Go back"
                    type="button"
                >
                    <ArrowLeft size={20} />
                </button>
            </div>
            <div className={styles.container}>
                <section className={styles.sidebar}>
                    <div ref={currentWeatherRef}>
                        <CurrentWeatherPanel />
                    </div>
                    {showCompactSummary && (
                        <Card className={styles.mobileSummaryCard} height="auto" width="100%" padding={12}>
                            <div className={styles.sidebarSummary}>
                                <div className={styles.summaryRow}>
                                    <strong>15°C</strong>
                                    <span>Oulu, FI</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Feels like 13°C</span>
                                    <span>Sunday</span>
                                </div>
                            </div>
                        </Card>
                    )}
                    <div className={styles.sidebarCities}>
                        <OtherCities />
                    </div>
                </section>
                <section className={styles.mainContent}>
                    <TodaysHighlight />
                    <TwentyFourHourForecast />
                    <SevenDayForecast />
                    <OtherCities />
                </section>
            </div>
        </>

    )
}
