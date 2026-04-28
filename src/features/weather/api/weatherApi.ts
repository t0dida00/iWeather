import axios from 'axios'

type Coordinates = {
  lat: number
  lon: number
  tempUnit?: 'celsius' | 'fahrenheit'
}

const weatherUrl = import.meta.env.VITE_OPEN_METEO_FORECAST_URL

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

function getWeatherUrl() {
  if (!weatherUrl) {
    throw new Error('Missing VITE_OPEN_METEO_FORECAST_URL')
  }

  return weatherUrl
}

const getBaseParams = ({ lat, lon, tempUnit = 'celsius' }: Coordinates) => ({
  latitude: lat,
  longitude: lon,
  temperature_unit: tempUnit,
  timezone: 'auto',
})

export async function getCurrentWeather({ lat, lon, tempUnit = 'celsius' }: Coordinates) {
  const { data } = await axios.get(getWeatherUrl(), {
    params: {
      ...getBaseParams({ lat, lon, tempUnit }),
      current: current.join(','),
    },
  })

  return data
}

export async function getDailyWeather({ lat, lon, tempUnit = 'celsius' }: Coordinates) {
  const { data } = await axios.get(getWeatherUrl(), {
    params: {
      ...getBaseParams({ lat, lon, tempUnit }),
      daily: daily.join(','),
    },
  })

  return data
}

export async function getHourlyWeather({ lat, lon, tempUnit = 'celsius' }: Coordinates) {
  const { data } = await axios.get(getWeatherUrl(), {
    params: {
      ...getBaseParams({ lat, lon, tempUnit }),
      hourly: hourly.join(','),
    },
  })

  return data
}

export async function getWeatherSummary({ lat, lon, tempUnit = 'celsius' }: Coordinates) {
  const dailySummary = ['temperature_2m_max', 'temperature_2m_min', 'weather_code']
  const { data } = await axios.get(getWeatherUrl(), {
    params: {
      ...getBaseParams({ lat, lon, tempUnit }),
      daily: dailySummary.join(','),
      forecast_days: 1,
    },
  })

  return data
}
