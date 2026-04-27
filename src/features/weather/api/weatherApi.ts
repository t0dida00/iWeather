import axios from 'axios'

type Coordinates = {
  lat: number
  lon: number
}
const weatherUrl = import.meta.env.VITE_OPEN_METEO_FORECAST_URL
export async function getWeatherData({ lat, lon }: Coordinates) {
  if (!weatherUrl) {
    throw new Error('Missing VITE_OPEN_METEO_FORECAST_URL')
  }
  const tempUnit = localStorage.getItem('temp') as 'celsius' | 'fahrenheit' | null
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
   
  ]

  const hourly = [
    'visibility',
    'temperature_2m',
    'wind_speed_10m',
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
      temperature_unit: tempUnit || 'celsius',
      timezone: 'auto',
    },
  })

  return data
}
