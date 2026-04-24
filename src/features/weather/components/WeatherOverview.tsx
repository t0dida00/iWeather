import { useCurrentWeather } from '../hooks/useCurrentWeather'

export function WeatherOverview() {
  const { data, isError, isPending } = useCurrentWeather()

  if (isPending) {
    return <p>Loading weather...</p>
  }

  if (isError) {
    return <p>Could not load weather.</p>
  }

  return (
    <section className="weather-card">
      <h1>iWeather</h1>
      <p>Kyiv</p>
      <strong>{Math.round(data.temperature_2m)} deg C</strong>
      <small>Wind {Math.round(data.wind_speed_10m)} km/h</small>
    </section>
  )
}
