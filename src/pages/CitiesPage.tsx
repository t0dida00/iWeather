import Card from '../shared/ui/Card'
import CityCard from '../shared/ui/CityCard'
import styles from './CitiesPage.module.scss'

const cities = [
  { countryName: 'Australia', cityName: 'Canberra', condition: 'Clear Sky', tempHigh: '13°', tempLow: '12°' },
  { countryName: 'Japan', cityName: 'Tokyo', condition: 'Partly Cloudy', tempHigh: '18°', tempLow: '18°' },
  { countryName: 'USA', cityName: 'New York', condition: 'Overcast', tempHigh: '6°', tempLow: '3°' },
  { countryName: 'Finland', cityName: 'Oulu', condition: 'Cloudy', tempHigh: '5°', tempLow: '1°' },
  { countryName: 'France', cityName: 'Paris', condition: 'Sunny', tempHigh: '16°', tempLow: '9°' },
  null,
  { countryName: 'Italy', cityName: 'Rome', condition: 'Clear Sky', tempHigh: '21°', tempLow: '14°' },
  { countryName: 'Canada', cityName: 'Toronto', condition: 'Overcast', tempHigh: '8°', tempLow: '2°' },
  { countryName: 'Brazil', cityName: 'Sao Paulo', condition: 'Partly Cloudy', tempHigh: '25°', tempLow: '19°' },
  { countryName: 'Norway', cityName: 'Oslo', condition: 'Cloudy', tempHigh: '4°', tempLow: '-1°' }
]

export function CitiesPage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Cities</h1>
        <p>Browse simulated weather for 10 cities.</p>
      </header>

      <section className={styles.grid}>
        {cities.map((city, index) => {
          if (!city) {
            return (
              <Card
                background="var(--card-inner-background)"
                borderColor="var(--card-inner-border)"
                borderRadius={8}
                className={styles.skeletonCard}
                height="auto"
                key="missing-city"
                padding={12}
                width="100%"
              />
            )
          }

          return (
            <CityCard
              condition={city.condition}
              countryName={city.countryName}
              cityName={city.cityName}
              key={`${city.countryName}-${city.cityName}-${index}`}
              tempHigh={city.tempHigh}
              tempLow={city.tempLow}
            />
          )
        })}
      </section>
    </main>
  )
}
