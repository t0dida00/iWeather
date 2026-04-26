import {
  Droplets,
  Eye,
  Sunrise,
  Sunset,
  Sun,
  Wind
} from 'lucide-react'
import Card from '../../../shared/ui/Card'
import styles from './TodaysHighlight.module.scss'
import type { TodayWeatherData } from '../types'
import { convertMeterToKilometer, convertStringToTime } from '../../../shared/utils/common'

export function TodaysHighlight({ data }: { data: TodayWeatherData }) {
  return (
    <Card height="auto" width="100%" padding={12}>
      <section className={styles.container}>
        <h2>Metrics</h2>
        <div className={styles.grid}>
          <Card
            background="var(--card-inner-background)"
            borderColor="var(--card-inner-border)"
            borderRadius={10}
            className={styles.metricCard}
            height="auto"
            padding={14}
            width="100%"
          >
            <div className={styles.metricLabel}>
              <Wind size={14} />
              <span>Wind Status</span>
            </div>
            <p className={styles.metricValue}>
              {data.windSpeed}
              <span>{data.windSpeedUnit}</span>
            </p>
            <p className={styles.metricNote}>NW - 323°</p>
          </Card>

          <Card
            background="var(--card-inner-background)"
            borderColor="var(--card-inner-border)"
            borderRadius={10}
            className={styles.metricCard}
            height="auto"
            padding={14}
            width="100%"
          >
            <div className={styles.metricLabel}>
              <Droplets size={14} />
              <span>Humidity</span>
            </div>
            <p className={styles.metricValue}>
              {data.humidity}
              <span>%</span>
            </p>
            <p className={styles.metricNote}>Humid</p>
          </Card>

          <Card
            background="var(--card-inner-background)"
            borderColor="var(--card-inner-border)"
            borderRadius={10}
            className={styles.sunCard}
            height="auto"
            padding={14}
            width="100%"
          >
            <Sunrise size={36} />
            <span>Sunrise</span>
            <strong>{convertStringToTime(data.sunrise)}</strong>
          </Card>

          <Card
            background="var(--card-inner-background)"
            borderColor="var(--card-inner-border)"
            borderRadius={10}
            className={styles.metricCard}
            height="auto"
            padding={14}
            width="100%"
          >
            <div className={styles.metricLabel}>
              <Sun size={14} />
              <span>UV Index</span>
            </div>
            <p className={styles.metricValue}>
              {data.uvIndex}
              <span>UV</span>
            </p>
            <p className={styles.metricNote}>Moderate UV</p>
          </Card>

          <Card
            background="var(--card-inner-background)"
            borderColor="var(--card-inner-border)"
            borderRadius={10}
            className={styles.metricCard}
            height="auto"
            padding={14}
            width="100%"
          >
            <div className={styles.metricLabel}>
              <Eye size={14} />
              <span>Visibility</span>
            </div>
            <p className={styles.metricValue}>
              {convertMeterToKilometer(data.visibility)}
              <span>KM</span>
            </p>
            <p className={styles.metricNote}>Clear</p>
          </Card>

          <Card
            background="var(--card-inner-background)"
            borderColor="var(--card-inner-border)"
            borderRadius={10}
            className={styles.sunCard}
            height="auto"
            padding={14}
            width="100%"
          >
            <Sunset size={36} />
            <span>Sunset</span>
            <strong>{convertStringToTime(data.sunset)}</strong>
          </Card>
        </div>
      </section>
    </Card>
  )
}
