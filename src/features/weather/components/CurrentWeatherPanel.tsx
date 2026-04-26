import Card from '../../../shared/ui/Card'
import { useCurrentWeather } from '../hooks/useCurrentWeather'
import styles from "./CurrentWeatherPanel.module.scss"
import { MapPin } from 'lucide-react';

export function CurrentWeatherPanel() {
  const { isError, isPending } = useCurrentWeather()

  if (isPending) {
    return <p>Loading weather...</p>
  }

  if (isError) {
    return <p>Could not load weather.</p>
  }

  return (
    <Card borderColor={"#e4e4e4"} height={"auto"} width={"350px"} >
      <div className={styles.container}>
        <div className={styles.location}>
          <MapPin size={16} />
          <p>Oulu</p>
        </div>
        <div className={styles.date}>
          <p>Sunday</p>
          <p>Apr 26, 2026</p>
        </div>
        <div className={styles.weatherInfoContainer}>
          <MapPin size={80} />
          <div className={styles.weatherInfo}>
            <p className={styles.temperature}><span className={styles.temperatureValue}>15</span>°C</p>
            <p className={styles.highLow}>H: 17°C L: 10°C</p>
            <p className={styles.description}>Partly Cloudy</p>
            <p className={styles.feelsLike}>Feels like 13°C</p>

          </div>
        </div>
      </div>

    </Card >
  )
}
