import { Cloud, CloudRain, CloudSun, Sun } from 'lucide-react'
import Card from '../../../shared/ui/Card'
import styles from './SevenDayForecast.module.scss'

export function SevenDayForecast() {
  return (
    <Card height="auto" width="100%" padding={0}>
      <section className={styles.container}>
        <div className={styles.header}>
          <h2>7-Day Forecast</h2>
        </div>

        <div className={styles.dayList}>
          <div className={`${styles.dayCard} ${styles.activeDay}`}>
            <span>Today</span>
            <Cloud size={34} />
            <strong>5°C</strong>
            <p>Cloudy</p>
          </div>

          <div className={styles.dayCard}>
            <span>Tomorrow</span>
            <Cloud size={34} />
            <strong>6°C</strong>
            <p>Cloudy</p>
          </div>

          <div className={styles.dayCard}>
            <span>Tue</span>
            <CloudSun size={34} />
            <strong>7°C</strong>
            <p>Partly</p>
          </div>

          <div className={styles.dayCard}>
            <span>Wed</span>
            <Cloud size={34} />
            <strong>3°C</strong>
            <p>Overcast</p>
          </div>

          <div className={styles.dayCard}>
            <span>Thu</span>
            <CloudRain size={34} />
            <strong>9°C</strong>
            <p>Rain</p>
          </div>

          <div className={styles.dayCard}>
            <span>Fri</span>
            <Sun size={34} />
            <strong>10°C</strong>
            <p>Sunny</p>
          </div>

          <div className={styles.dayCard}>
            <span>Sat</span>
            <CloudSun size={34} />
            <strong>14°C</strong>
            <p>Clear</p>
          </div>
        </div>
      </section>
    </Card>
  )
}
