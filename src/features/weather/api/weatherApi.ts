import axios from 'axios'

type Coordinates = {
  lat: number
  lon: number
  tempUnit?: 'celsius' | 'fahrenheit'
}
const weatherUrl = import.meta.env.VITE_OPEN_METEO_FORECAST_URL
export async function getWeatherData({ lat, lon, tempUnit = 'celsius' }: Coordinates) {
  if (!weatherUrl) {
    throw new Error('Missing VITE_OPEN_METEO_FORECAST_URL')
  }
 const current = [
    'temperature_2m',
    'apparent_temperature',
    'relative_humidity_2m',
    'weather_code',
    'wind_speed_10m',
    'wind_direction_10m',
  ]

  const daily = [
    'sunrise',
    'sunset',
    'temperature_2m_min',
    'temperature_2m_max',
    'weather_code',
   
  ]

  const hourly = [
    'visibility',
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'wind_speed_10m',
     'wind_direction_10m',
    'weather_code',
    'uv_index',
     'precipitation_probability',
  ]


  const { data } = await axios.get(weatherUrl, {
    params: {
      latitude: lat,
      longitude: lon,
      current: current.join(','),
      daily: daily.join(','),
      hourly: hourly.join(','),
      temperature_unit: tempUnit,
      timezone: 'auto',
    },
  })

  return data
}
