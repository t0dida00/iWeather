import Card from '../../../shared/ui/Card'
import styles from "./CurrentWeatherPanel.module.scss"
import { CloudSun, MapPin } from 'lucide-react';

export function CurrentWeatherPanel() {

  return (
    <Card borderColor={"#e4e4e4"} height={"auto"} width={"100%"} >
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
          <CloudSun size={80} />
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
