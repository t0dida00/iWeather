import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getWeatherData } from '../api/weatherApi'
import type { Coordinates, TodayWeatherData, TwentyFourHourWeatherData } from '../types'
import { getCurrentDay, getDayIndex, getHourDateTimeForDay, getRecentDateTimeIndex, getRecentDayIndexes, normalizeDate } from '../../../shared/utils/common'
import { useTemp } from '../../preferences/hooks/useTemp'
export function useWeatherData({ lat, lon }: Coordinates) {
  const [selectedDay, setSelectedDay] = useState(getCurrentDay())
  const { temp } = useTemp()

  const { data, isError, isPending, error } = useQuery({
  queryKey: ['weatherData', lat, lon, temp],
  queryFn: () => {
      return getWeatherData({ lat, lon, tempUnit: temp });
    },
  staleTime: 1000 * 60 * 10, // 10 minutes
  refetchOnWindowFocus: false,
})
  const currentDateTime = getHourDateTimeForDay(selectedDay)
  const currentDayIndexes = getRecentDayIndexes(data?.hourly?.time || [], selectedDay)
  const currentHourlyData = data?.hourly?.time.slice(currentDayIndexes.start, currentDayIndexes.end + 1) || []
  const currentHourIndex = currentDayIndexes.start + getRecentDateTimeIndex(currentHourlyData, currentDateTime)
  const currentDayIndex = getDayIndex(data?.daily?.time || [], selectedDay)

  const todayWeatherData: TodayWeatherData | null  = data? {
    temperature: data.hourly.temperature_2m[currentHourIndex],
    apparentTemperature: data.hourly.apparent_temperature[currentHourIndex],
    humidity: data.hourly.relative_humidity_2m[currentHourIndex],
    weatherCode: data.hourly.weather_code[currentHourIndex],
    windSpeed: data.hourly.wind_speed_10m[currentHourIndex],
    windDirection: data.hourly.wind_direction_10m[currentHourIndex],
    datetime: data.hourly.time[currentHourIndex],


    tempHigh: data.daily.temperature_2m_max[currentDayIndex],
    tempLow: data.daily.temperature_2m_min[currentDayIndex],
    sunrise: data.daily.sunrise[currentDayIndex],
    sunset: data.daily.sunset[currentDayIndex],

    visibility: data.hourly.visibility[currentHourIndex],
    uvIndex: data.hourly.uv_index[currentHourIndex],

    temperatureUnit: data.hourly_units.temperature_2m,
    windSpeedUnit: data.hourly_units.wind_speed_10m,
    windDirectionUnit: data.hourly_units.wind_direction_10m,
    visibilityUnit: data.hourly_units.visibility,
    uvIndexUnit: data.hourly_units.uv_index,

  } : null

const everyTwoHours = <T,>(arr: T[], startIndex: number) =>
  arr.slice(startIndex, startIndex + 24).filter((_, i) => i % 2 === 0)

const oneDayHourlyData: TwentyFourHourWeatherData | null =
  data?.hourly && data?.daily
    ? {
        time: everyTwoHours(data.hourly.time, currentDayIndexes.start),
        temperature: everyTwoHours(data.hourly.temperature_2m, currentDayIndexes.start),
        weatherCode: everyTwoHours(data.hourly.weather_code, currentDayIndexes.start),
        windSpeed: everyTwoHours(data.hourly.wind_speed_10m, currentDayIndexes.start),
        precipitationProbability: everyTwoHours(
          data.hourly.precipitation_probability,
          currentDayIndexes.start
        ),
        precipitationProbabilityMax:  Math.max(...(everyTwoHours(data.hourly.precipitation_probability,currentDayIndexes.start) as number[])),
        windSpeedMax:  Math.max(...(everyTwoHours(data.hourly.wind_speed_10m,currentDayIndexes.start) as number[])),
        tempHigh: data.daily.temperature_2m_max[currentDayIndex],
        tempLow: data.daily.temperature_2m_min[currentDayIndex],

        temperatureUnit: data.hourly_units.temperature_2m,
        windSpeedUnit: data.hourly_units.wind_speed_10m,
      }
    : null
const sevenDayData = data?.daily
  ? {
      date: data.daily.time,
      tempHigh: data.daily.temperature_2m_max,
      tempLow: data.daily.temperature_2m_min,
      weatherCode: data.daily.weather_code,
      temperatureUnit:  data.hourly_units.temperature_2m,
    }
  : null
  return { data, todayWeatherData, oneDayHourlyData, sevenDayData,
    selectedDay: normalizeDate(selectedDay),
    setSelectedDay,
    isError, 
    isPending, 
    error }
}
