import { Link } from 'react-router-dom'
import Card from '../Card'
import styles from './CityCard.module.scss'
import { WEATHER_CODE_MAP } from '../../utils/weatherCodes'

type CityCardProps = {
  countryName: string
  cityName: string
  weatherCode?: number
  tempHigh: string
  tempLow: string
  latitude: number
  longitude: number
  code: string
}

export default function CityCard({
  countryName,
  cityName,
  weatherCode,
  tempHigh,
  tempLow,
  latitude,
  longitude,
  code
}: CityCardProps) {
  const WeatherIcon = weatherCode != null ? WEATHER_CODE_MAP[weatherCode]?.icon : undefined
  const condition = weatherCode != null ? WEATHER_CODE_MAP[weatherCode]?.label ?? 'Unknown' : 'Unknown'

  return (
    <Link className={styles.cityLink} to={`/overview/?city=${cityName}&code=${code}&lat=${latitude}&lon=${longitude}`}>
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

        {WeatherIcon && <WeatherIcon className={styles.cityIcon} size={34} />}

        <p className={styles.temperature}>
          {tempHigh}
          <span>/{tempLow}</span>
        </p>
      </Card>
    </Link>
  )
}
