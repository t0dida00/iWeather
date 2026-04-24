import axios from 'axios'

const weatherUrl = import.meta.env.VITE_OPEN_METEO_FORECAST_URL

export async function getCurrentWeather() {
  if (!weatherUrl) {
    throw new Error('Missing VITE_OPEN_METEO_FORECAST_URL')
  }

  const { data } = await axios.get(weatherUrl, {
    params: {
      latitude: '50.45',
      longitude: '30.52',
      current: 'temperature_2m,relative_humidity_2m,wind_speed_10m',
      timezone: 'auto',
    },
  })

  return data.current
}
