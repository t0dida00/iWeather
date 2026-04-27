import Card from '../../../shared/ui/Card'
import styles from './SevenDayForecast.module.scss'
import type { SevenDayWeatherData } from '../types'
import { WEATHER_CODE_MAP } from '../../../shared/utils/weatherCodes'
import { roundNumber } from '../../../shared/utils/roundNumber'
import { convertStringToDay } from '../../../shared/utils/common'

export function SevenDayForecast({ data }: { data: SevenDayWeatherData | null }) {
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
            const WeatherIcon =
              WEATHER_CODE_MAP[weatherCode]?.icon;
            const weatherDescription = WEATHER_CODE_MAP[weatherCode]?.label || 'Unknown weather'
            return (<div className={styles.dayCard}>
              <span>{convertStringToDay(date)}</span>
              <WeatherIcon size={34} />
              {/* <p><strong>{roundNumber(data.tempHigh[index])}°</strong>/{roundNumber(data.tempLow[index])}°</p> */}
              <p className={styles.temperature}>
                {roundNumber(data.tempHigh[index])}°
                <span>/{roundNumber(data.tempLow[index])}</span>
              </p>
              <p>{weatherDescription}</p>
            </div>)
          })}

        </div>
      </section>
    </Card>
  )
}
