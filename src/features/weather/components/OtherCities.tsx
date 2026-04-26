import Card from '../../../shared/ui/Card'
import CityCard from '../../../shared/ui/CityCard'
import styles from './OtherCities.module.scss'

const cities = [
  {
    countryName: 'Australia',
    cityName: 'Canberra',
    condition: 'Clear Sky',
    tempHigh: '13°',
    tempLow: '12°'
  },
  {
    countryName: 'Japan',
    cityName: 'Tokyo',
    condition: 'Partly Cloudy',
    tempHigh: '18°',
    tempLow: '18°'
  },
  {
    countryName: 'USA',
    cityName: 'New York',
    condition: 'Overcast',
    tempHigh: '6°',
    tempLow: '3°'
  }
]

export function OtherCities() {
  return (
    <Card height="auto" width="100%" padding={0}>
      <section className={styles.container}>
        <div className={styles.header}>
          <h2>Other Cities</h2>
        </div>

        <div className={styles.cityList}>
          {cities.map((city) => (
            <CityCard
              condition={city.condition}
              countryName={city.countryName}
              cityName={city.cityName}
              key={city.cityName}
              tempHigh={city.tempHigh}
              tempLow={city.tempLow}
            />
          ))}
        </div>
      </section>
    </Card>
  )
}
