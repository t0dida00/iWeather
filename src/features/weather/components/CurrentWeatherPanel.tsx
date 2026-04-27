import Card from '../../../shared/ui/Card'
import { convertStringToDateTime, convertStringToDay } from '../../../shared/utils/common';
import { roundNumber } from '../../../shared/utils/roundNumber';
import { WEATHER_CODE_MAP } from '../../../shared/utils/weatherCodes';
import type { TodayWeatherData } from '../types';
import styles from "./CurrentWeatherPanel.module.scss"
import { MapPin } from 'lucide-react';

export function CurrentWeatherPanel({ data }: { data: TodayWeatherData }) {
  const WeatherIcon = WEATHER_CODE_MAP[data.weatherCode]?.icon;

  return (
    <Card height={"auto"} width={"100%"} >
      <div className={styles.container}>
        <div className={styles.location}>
          <MapPin size={16} />
          <p>Oulu, FI</p>
        </div>
        <div className={styles.date}>
          <p>{convertStringToDay(data.datetime)}</p>
          <p>{convertStringToDateTime(data.datetime)}</p>
        </div>
        <div className={styles.weatherInfoContainer}>
          {WeatherIcon && (
            <WeatherIcon size={80} />
          )}
          <div className={styles.weatherInfo}>
            <p className={styles.temperature}><span className={styles.temperatureValue}>{roundNumber(data.temperature)}</span> <span className={styles.tempUnit}>{data.temperatureUnit}</span></p>
            <p className={styles.highLow}>H: {roundNumber(data.tempHigh)}° L: {roundNumber(data.tempLow)}°</p>
            <p className={styles.description}>{WEATHER_CODE_MAP[data.weatherCode]?.label || "Unknown"}</p>
            <p className={styles.feelsLike}>Feels  {roundNumber(data.apparentTemperature)}{data.temperatureUnit}</p>
          </div>
        </div>
      </div>

    </Card >
  )
}
