import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCurrentWeather, getDailyWeather, getHourlyWeather } from '../api/weatherApi'
import type { Coordinates, TodayWeatherData, TwentyFourHourWeatherData } from '../types'
import { getCurrentDay, getDayIndex, getHourDateTimeForDay, getRecentDateTimeIndex, getRecentDayIndexes, normalizeDate } from '../../../shared/utils/common'
import { useTemp } from '../../preferences/hooks/useTemp'
import { useSearchHistory } from '../../search/hooks/useSearchHistory'

const currentStaleTime = 1000 * 60 * 15
const hourlyStaleTime = 1000 * 60 * 30
const dailyStaleTime = 1000 * 60 * 60 * 6

export function useWeatherData({ lat, lon }: Coordinates) {
  const [selectedDay, setSelectedDay] = useState(getCurrentDay())
  const {updateHistory} = useSearchHistory()
  const { temp } = useTemp()

  const currentQuery = useQuery({
    queryKey: ['weatherData', 'current', lat, lon, temp],
    queryFn: () => getCurrentWeather({ lat, lon, tempUnit: temp }),
    staleTime: currentStaleTime,
    refetchInterval: currentStaleTime, // Refetch every 15 minutes
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  })

  const hourlyQuery = useQuery({
    queryKey: ['weatherData', 'hourly', lat, lon, temp],
    queryFn: () => getHourlyWeather({ lat, lon, tempUnit: temp }),
    staleTime: hourlyStaleTime,
    refetchInterval: hourlyStaleTime, // Refetch every 30 minutes
    refetchIntervalInBackground: false,
    refetchOnWindowFocus:   true,
  })

  const dailyQuery = useQuery({
    queryKey: ['weatherData', 'daily', lat, lon, temp],
    queryFn: () => getDailyWeather({ lat, lon, tempUnit: temp }),
    staleTime: dailyStaleTime,
    refetchInterval: dailyStaleTime, // Refetch every 6 hours
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  })

  const data = currentQuery.data || hourlyQuery.data || dailyQuery.data ? {
    current: currentQuery.data?.current,
    current_units: currentQuery.data?.current_units,
    hourly: hourlyQuery.data?.hourly,
    hourly_units: hourlyQuery.data?.hourly_units,
    daily: dailyQuery.data?.daily,
    daily_units: dailyQuery.data?.daily_units,
  } : undefined

  const isError = currentQuery.isError || hourlyQuery.isError || dailyQuery.isError
  const isPending = currentQuery.isPending || hourlyQuery.isPending || dailyQuery.isPending
  const error = currentQuery.error || hourlyQuery.error || dailyQuery.error

  const selectedDate = normalizeDate(selectedDay)
  const selectedDayIsToday = selectedDate === getCurrentDay()
  const currentDateTime = getHourDateTimeForDay(selectedDay)
  const currentDayIndexes = getRecentDayIndexes(data?.hourly?.time || [], selectedDay)
  const currentHourlyData = data?.hourly?.time.slice(currentDayIndexes.start, currentDayIndexes.end + 1) || []
  const currentHourIndex = currentDayIndexes.start + getRecentDateTimeIndex(currentHourlyData, currentDateTime)
  const currentDayIndex = getDayIndex(data?.daily?.time || [], selectedDay)
  const hasCurrentWeather = selectedDayIsToday && data?.current && data.current_units
  const hasHourlyWeather = data?.hourly && data.hourly_units && currentHourIndex >= 0
  const hasDailyWeather = data?.daily && currentDayIndex >= 0

  const todayWeatherData: TodayWeatherData | null =
    hasDailyWeather && (hasCurrentWeather || hasHourlyWeather)
      ? {
          temperature: hasCurrentWeather
            ? data.current.temperature_2m
            : data.hourly.temperature_2m[currentHourIndex],
          apparentTemperature: hasCurrentWeather
            ? data.current.apparent_temperature
            : data.hourly.apparent_temperature[currentHourIndex],
          humidity: hasCurrentWeather
            ? data.current.relative_humidity_2m
            : data.hourly.relative_humidity_2m[currentHourIndex],
          weatherCode: hasCurrentWeather
            ? data.current.weather_code
            : data.hourly.weather_code[currentHourIndex],
          windSpeed: hasCurrentWeather
            ? data.current.wind_speed_10m
            : data.hourly.wind_speed_10m[currentHourIndex],
          windDirection: hasCurrentWeather
            ? data.current.wind_direction_10m
            : data.hourly.wind_direction_10m[currentHourIndex],
          datetime: hasCurrentWeather
            ? data.current.time
            : data.hourly.time[currentHourIndex],

          tempHigh: data.daily.temperature_2m_max[currentDayIndex],
          tempLow: data.daily.temperature_2m_min[currentDayIndex],
          sunrise: data.daily.sunrise[currentDayIndex],
          sunset: data.daily.sunset[currentDayIndex],

          visibility: hasHourlyWeather ? data.hourly.visibility[currentHourIndex] : 0,
          uvIndex: hasHourlyWeather ? data.hourly.uv_index[currentHourIndex] : 0,

          temperatureUnit: hasCurrentWeather
            ? data.current_units.temperature_2m
            : data.hourly_units.temperature_2m,
          windSpeedUnit: hasCurrentWeather
            ? data.current_units.wind_speed_10m
            : data.hourly_units.wind_speed_10m,
          windDirectionUnit: hasCurrentWeather
            ? data.current_units.wind_direction_10m
            : data.hourly_units.wind_direction_10m,
          visibilityUnit: hasHourlyWeather ? data.hourly_units.visibility : '',
          uvIndexUnit: hasHourlyWeather ? data.hourly_units.uv_index : '',
        }
      : null

const everyTwoHours = <T,>(arr: T[], startIndex: number) =>
  arr.slice(startIndex, startIndex + 24).filter((_, i) => i % 2 === 0)

const oneDayHourlyData: TwentyFourHourWeatherData | null =
  data?.hourly && data.hourly_units && data.daily && currentDayIndexes.start >= 0 && currentDayIndex >= 0
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
const sevenDayData = data?.daily && data.hourly_units
  ? {
      date: data.daily.time,
      tempHigh: data.daily.temperature_2m_max,
      tempLow: data.daily.temperature_2m_min,
      weatherCode: data.daily.weather_code,
      temperatureUnit:  data.hourly_units.temperature_2m,
    }
  : null

  const historyTempHigh = todayWeatherData?.tempHigh
  const historyTempLow = todayWeatherData?.tempLow
  const historyWeatherCode = todayWeatherData?.weatherCode

  useEffect(() => {
    if (
      historyTempHigh === undefined ||
      historyTempLow === undefined ||
      historyWeatherCode === undefined
    ) {
      return
    }

    updateHistory(lat, lon, {
      tempHigh: historyTempHigh,
      tempLow: historyTempLow,
      weatherCode: historyWeatherCode,
    })
  }, [lat, lon, historyTempHigh, historyTempLow, historyWeatherCode, updateHistory])

  return { data, todayWeatherData, oneDayHourlyData, sevenDayData,
    selectedDay: selectedDate,
    setSelectedDay,
    isError, 
    isPending, 
    error }
}
