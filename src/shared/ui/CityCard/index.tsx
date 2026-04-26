import { Cloud, CloudSun, Sun } from 'lucide-react'
import Card from '../Card'
import styles from './CityCard.module.scss'

type CityCardProps = {
  countryName: string
  cityName: string
  condition: string
  tempHigh: string
  tempLow: string
}

const getWeatherIcon = (condition: string) => {
  const normalizedCondition = condition.toLowerCase()

  if (normalizedCondition.includes('clear') || normalizedCondition.includes('sun')) {
    return Sun
  }

  if (normalizedCondition.includes('partly')) {
    return CloudSun
  }

  return Cloud
}

export default function CityCard({
  countryName,
  cityName,
  condition,
  tempHigh,
  tempLow
}: CityCardProps) {
  const Icon = getWeatherIcon(condition)

  return (
    <Card
      background="var(--card-inner-background)"
      borderColor="var(--card-inner-border)"
      borderRadius={8}
      className={styles.cityCard}
      height="auto"
      padding="12px"
      width="100%"
    >
      <div>
        <p className={styles.country}>{countryName}</p>
        <h3>{cityName}</h3>
        <p className={styles.condition}>{condition}</p>
      </div>

      <Icon className={styles.cityIcon} size={34} />

      <p className={styles.temperature}>
        {tempHigh}
        <span>/{tempLow}</span>
      </p>
    </Card>
  )
}
