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

export function TodaysHighlight() {
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
              25.90
              <span>km/h</span>
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
              60
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
            <strong>5:01 AM</strong>
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
              4
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
              47
              <span>km</span>
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
            <strong>9:30 PM</strong>
          </Card>
        </div>
      </section>
    </Card>
  )
}
