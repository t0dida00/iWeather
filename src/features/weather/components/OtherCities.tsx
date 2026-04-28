import { useMemo } from 'react'
import Card from '../../../shared/ui/Card'
import CityCard from '../../../shared/ui/CityCard'
import { useSearchHistory } from '../../search/hooks/useSearchHistory'
import styles from './OtherCities.module.scss'

const MAX_OTHER_CITIES = 5

const formatTemperature = (value: number | undefined) =>
  typeof value === 'number' ? `${Math.round(value)}°` : '--'

type OtherCitiesProps = {
  currentLatitude?: number
  currentLongitude?: number
}

export function OtherCities({ currentLatitude, currentLongitude }: OtherCitiesProps) {
  const { history } = useSearchHistory()

  const cities = useMemo(
    () =>
      history
        .filter(
          (entry) =>
            entry.latitude !== currentLatitude || entry.longitude !== currentLongitude
        )
        .slice(0, MAX_OTHER_CITIES)
        .map((entry, index) => ({
          latitude: entry.latitude,
          longitude: entry.longitude,
          countryName: entry.country,
          cityName: entry.name,
          weatherCode: entry.weatherCode,
          tempHigh: formatTemperature(entry.tempHigh),
          tempLow: formatTemperature(entry.tempLow),
          key: `${entry.name}-${entry.country_code}-${index}`,
          code: entry.country_code,
        })),
    [currentLatitude, currentLongitude, history]
  )

  return (
    <Card height="auto" width="100%" padding={0}>
      <section className={styles.container}>
        <div className={styles.header}>
          <h2>Other Cities (Current Day)</h2>
        </div>

        <div className={styles.cityList}>
          {cities.map((city) => (
            <CityCard
              countryName={city.countryName}
              cityName={city.cityName}
              weatherCode={city.weatherCode}
              key={city.key}
              tempHigh={city.tempHigh}
              tempLow={city.tempLow}
              latitude={city.latitude}
              longitude={city.longitude}
              code={city.code}
            />
          ))}
        </div>
      </section>
    </Card>
  )
}
