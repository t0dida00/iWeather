import { useMemo } from 'react'
import Card from '../shared/ui/Card'
import CityCard from '../shared/ui/CityCard'
import styles from './CitiesPage.module.scss'
import { useSearchHistory } from '../features/search/hooks/useSearchHistory'
import { WEATHER_CODE_MAP } from '../shared/utils/weatherCodes'

const formatTemperature = (value: number | undefined) =>
  typeof value === 'number' ? `${Math.round(value)}°` : '--'

const getConditionLabel = (code: number | undefined) =>
  code != null ? WEATHER_CODE_MAP[code]?.label ?? 'Unknown' : 'Unknown'

export function CitiesPage() {
  const { history } = useSearchHistory()

  const cities = useMemo(
    () =>
      history.map((entry, index) => ({
        latitude: entry.latitude,
        longitude: entry.longitude,
        countryName: entry.country,
        cityName: entry.name,
        condition: getConditionLabel(entry.weatherCode),
        tempHigh: formatTemperature(entry.tempHigh),
        tempLow: formatTemperature(entry.tempLow),
        key: `${entry.name}-${entry.country_code}-${index}`,
        code: entry.country_code,
      })),
    [history]
  )

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Cities</h1>
        <p>Browse weather for your most recently searched locations.</p>
      </header>

      <section className={styles.grid}>
        {cities.length === 0 ? (
          <Card
            background="var(--card-inner-background)"
            borderColor="var(--card-inner-border)"
            borderRadius={8}
            className={styles.skeletonCard}
            height="auto"
            padding={12}
            width="100%"
          >
            <p>No recent cities found. Search for a location to populate this list.</p>
          </Card>
        ) : (
          cities.map((city) => (
            <CityCard
              condition={city.condition}
              countryName={city.countryName}
              cityName={city.cityName}
              key={city.key}
              tempHigh={city.tempHigh}
              tempLow={city.tempLow}
              latitude={city.latitude}
              longitude={city.longitude}
              code={city.code}
            />
          ))
        )}
      </section>
    </main>
  )
}
