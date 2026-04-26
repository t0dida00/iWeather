import CityCard from '../shared/ui/CityCard'
import styles from './CitiesPage.module.scss'

const baseCities = [
  { countryName: 'Australia', cityName: 'Canberra', condition: 'Clear Sky', tempHigh: 13, tempLow: 12 },
  { countryName: 'Japan', cityName: 'Tokyo', condition: 'Partly Cloudy', tempHigh: 18, tempLow: 18 },
  { countryName: 'USA', cityName: 'New York', condition: 'Overcast', tempHigh: 6, tempLow: 3 },
  { countryName: 'Finland', cityName: 'Oulu', condition: 'Cloudy', tempHigh: 5, tempLow: 1 },
  { countryName: 'France', cityName: 'Paris', condition: 'Sunny', tempHigh: 16, tempLow: 9 },
  { countryName: 'Germany', cityName: 'Berlin', condition: 'Partly Cloudy', tempHigh: 12, tempLow: 7 },
  { countryName: 'Italy', cityName: 'Rome', condition: 'Clear Sky', tempHigh: 21, tempLow: 14 },
  { countryName: 'Canada', cityName: 'Toronto', condition: 'Overcast', tempHigh: 8, tempLow: 2 },
  { countryName: 'Brazil', cityName: 'Sao Paulo', condition: 'Partly Cloudy', tempHigh: 25, tempLow: 19 },
  { countryName: 'Norway', cityName: 'Oslo', condition: 'Cloudy', tempHigh: 4, tempLow: -1 }
]

const cities = Array.from({ length: 100 }, (_, index) => {
  const city = baseCities[index % baseCities.length]
  const cycle = Math.floor(index / baseCities.length)

  return {
    ...city,
    cityName: cycle === 0 ? city.cityName : `${city.cityName} ${cycle + 1}`,
    tempHigh: `${city.tempHigh + (cycle % 4)}°`,
    tempLow: `${city.tempLow + (cycle % 3)}°`
  }
})

export function CitiesPage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Cities</h1>
        <p>Browse simulated weather for 100 cities.</p>
      </header>

      <section className={styles.grid}>
        {cities.map((city) => (
          <CityCard
            condition={city.condition}
            countryName={city.countryName}
            cityName={city.cityName}
            key={`${city.countryName}-${city.cityName}`}
            tempHigh={city.tempHigh}
            tempLow={city.tempLow}
          />
        ))}
      </section>
    </main>
  )
}
