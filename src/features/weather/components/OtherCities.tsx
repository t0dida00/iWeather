import { Cloud, CloudSun, Sun } from 'lucide-react'
import Card from '../../../shared/ui/Card'
import styles from './OtherCities.module.scss'

const cities = [
  {
    country: 'Australia',
    name: 'Canberra',
    description: 'Clear Sky',
    temperature: '13°',
    range: '12°',
    icon: Sun
  },
  {
    country: 'Japan',
    name: 'Tokyo',
    description: 'Partly Cloudy',
    temperature: '18°',
    range: '18°',
    icon: CloudSun
  },
  {
    country: 'USA',
    name: 'New York',
    description: 'Overcast',
    temperature: '6°',
    range: '3°',
    icon: Cloud
  }
]

export function OtherCities() {
  return (
    <Card borderColor="#e4e4e4" height="auto" width="100%" padding={18}>
      <section className={styles.container}>
        <div className={styles.header}>
          <h2>Other Cities</h2>
          {/* <button type="button">
            See All
            <ChevronDown size={14} />
          </button> */}
        </div>

        <div className={styles.cityList}>
          {cities.map((city) => {
            const Icon = city.icon

            return (
              <article className={styles.cityCard} key={city.name}>
                <div>
                  <p className={styles.country}>{city.country}</p>
                  <h3>{city.name}</h3>
                  <p className={styles.description}>{city.description}</p>
                </div>

                <Icon className={styles.cityIcon} size={34} />

                <p className={styles.temperature}>
                  {city.temperature}
                  <span>/{city.range}</span>
                </p>
              </article>
            )
          })}
        </div>
      </section>
    </Card>
  )
}
