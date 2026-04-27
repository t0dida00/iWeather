import Card from '../../../shared/ui/Card'
import styles from './SevenDayForecast.module.scss'
import type { SevenDayWeatherData } from '../types'
import { WEATHER_CODE_MAP } from '../../../shared/utils/weatherCodes'
import { roundNumber } from '../../../shared/utils/roundNumber'
import { convertStringToDay } from '../../../shared/utils/common'

type SevenDayForecastProps = {
  data: SevenDayWeatherData | null
  selectedDay?: string
  onSelectDay?: (date: string) => void
}

export function SevenDayForecast({ data, selectedDay, onSelectDay }: SevenDayForecastProps) {
  if (!data) {
    return null
  }

  return (
    <Card height="auto" width="100%" padding={0}>
      <section className={styles.container}>
        <div className={styles.header}>
          <h2>7-Day Forecast</h2>
        </div>

        <div className={styles.dayList}>

          {data.date.map((date, index) => {
            const weatherCode = data.weatherCode[index] || 0
            const WeatherIcon = WEATHER_CODE_MAP[weatherCode]?.icon
            const weatherDescription = WEATHER_CODE_MAP[weatherCode]?.label || 'Unknown weather'
            const day = convertStringToDay(date)
            const high = roundNumber(data.tempHigh[index])
            const low = roundNumber(data.tempLow[index])

            return (<article
              aria-label={`${day}: ${weatherDescription}, high ${high} degrees, low ${low} degrees`}
              className={`${styles.dayCard} ${selectedDay === date ? styles.activeDay : ''}`}
              key={date}
              onClick={() => onSelectDay?.(date)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onSelectDay?.(date)
                }
              }}
              role="button"
              tabIndex={0}
            >
              <span>{day}</span>
              <WeatherIcon aria-hidden="true" size={34} />
              {/* <p><strong>{roundNumber(data.tempHigh[index])}°</strong>/{roundNumber(data.tempLow[index])}°</p> */}
              <p className={styles.temperature}>
                {roundNumber(data.tempHigh[index])}°
                <span>/{low}°</span>
              </p>
              <p>{weatherDescription}</p>
            </article>)
          })}

        </div>
      </section>
    </Card>
  )
}
