import { useMemo } from 'react'
import Card from '../shared/ui/Card'
import CityCard from '../shared/ui/CityCard'
import styles from './CitiesPage.module.scss'
import { useSearchHistory } from '../features/search/hooks/useSearchHistory'
import { useWeatherData } from '../features/weather/hooks/useWeatherData'

type CityWeatherCardProps = {
  cityName: string
  code: string
  countryName: string
  latitude: number
  longitude: number
}

const formatTemperature = (value: number | undefined) =>
  typeof value === 'number' ? `${Math.round(value)}°` : '--'

function CityWeatherCard({ cityName, code, countryName, latitude, longitude }: CityWeatherCardProps) {
  const { todayWeatherData } = useWeatherData({ lat: latitude, lon: longitude })

  return (
    <CityCard
      countryName={countryName}
      cityName={cityName}
      weatherCode={todayWeatherData?.weatherCode}
      tempHigh={formatTemperature(todayWeatherData?.tempHigh)}
      tempLow={formatTemperature(todayWeatherData?.tempLow)}
      latitude={latitude}
      longitude={longitude}
      code={code}
    />
  )
}

export function CitiesPage() {
  const { history } = useSearchHistory()

  const cities = useMemo(
    () =>
      history.map((entry, index) => ({
        latitude: entry.latitude,
        longitude: entry.longitude,
        countryName: entry.country,
        cityName: entry.name,
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
            <CityWeatherCard
              countryName={city.countryName}
              cityName={city.cityName}
              key={city.key}
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
