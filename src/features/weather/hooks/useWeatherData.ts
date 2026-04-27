import { useQuery } from '@tanstack/react-query'
import { getWeatherData } from '../api/weatherApi'
import type { Coordinates, TodayWeatherData, TwentyFourHourWeatherData } from '../types'
import { getRecentDateTimeIndex } from '../../../shared/utils/common'
export function useWeatherData({ lat, lon }: Coordinates) {

  const { data, isError, isPending, error } = useQuery({
  queryKey: ['weatherData', lat, lon],
  queryFn: () => {
      return getWeatherData({ lat, lon });
    },
  staleTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
})
  const currentIndex = getRecentDateTimeIndex(data?.hourly?.time || []) 
  const todayWeatherData: TodayWeatherData | null  = data? {
    temperature: data.current.temperature_2m,
    apparentTemperature: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    weatherCode: data.current.weather_code,
    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    datetime: data.current.time,
    tempHigh: data.daily.temperature_2m_max[0],
    tempLow: data.daily.temperature_2m_min[0],
    sunrise: data.daily.sunrise[0],
    sunset: data.daily.sunset[0],

    visibility: data.hourly.visibility[currentIndex],
    uvIndex: data.hourly.uv_index[currentIndex],

    temperatureUnit: data.current_units.temperature_2m,
    windSpeedUnit: data.current_units.wind_speed_10m,
    windDirectionUnit: data.current_units.wind_direction_10m,
    visibilityUnit: data.hourly_units.visibility,
    uvIndexUnit: data.hourly_units.uv_index,

  } : null

const everyTwoHours = <T,>(arr: T[]) =>
  arr.slice(0, 24).filter((_, i) => i % 2 === 0)

const oneDayHourlyData: TwentyFourHourWeatherData | null =
  data?.hourly && data?.daily
    ? {
        time: everyTwoHours(data.hourly.time),
        temperature: everyTwoHours(data.hourly.temperature_2m),
        weatherCode: everyTwoHours(data.hourly.weather_code),
        windSpeed: everyTwoHours(data.hourly.wind_speed_10m),
        precipitationProbability: everyTwoHours(
          data.hourly.precipitation_probability
        ),
        precipitationProbabilityMax: Math.max(...data.hourly.precipitation_probability),
        temperatureUnit: data.hourly_units.temperature_2m,
        windSpeedUnit: data.hourly_units.wind_speed_10m,
        windSpeedMax: Math.max(...data.hourly.wind_speed_10m),

        tempHigh: data.daily.temperature_2m_max[0],
        tempLow: data.daily.temperature_2m_min[0],
      }
    : null
const sevenDayData = data?.daily
  ? {
      date: data.daily.time,
      tempHigh: data.daily.temperature_2m_max,
      tempLow: data.daily.temperature_2m_min,
      weatherCode: data.daily.weather_code,
      temperatureUnit:  data.current_units.temperature_2m,
    }
  : null
  return { data, todayWeatherData, oneDayHourlyData, sevenDayData,
    isError, 
    isPending, 
    error }
}
