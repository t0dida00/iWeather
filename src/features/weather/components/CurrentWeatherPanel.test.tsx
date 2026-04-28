import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CurrentWeatherPanel } from './CurrentWeatherPanel'
import type { TodayWeatherData } from '../types'

const data: TodayWeatherData = {
  datetime: '2024-04-28T09:00',
  temperature: 25.4,
  apparentTemperature: 29.1,
  humidity: 96,
  weatherCode: 3,
  windSpeed: 11.8,
  windDirection: 149,
  tempHigh: 32,
  tempLow: 25,
  sunrise: '2024-04-28T05:28',
  sunset: '2024-04-28T18:20',
  temperatureUnit: '°C',
  windSpeedUnit: 'km/h',
  windDirectionUnit: '°',
  visibility: 6000,
  visibilityUnit: 'km',
  uvIndex: 0,
  uvIndexUnit: '',
}

const renderPanel = (city = 'Hanoi', code = 'VN') =>
  render(<CurrentWeatherPanel data={data} city={city} code={code} />)

describe('CurrentWeatherPanel', () => {
  it('shows city and country code', () => {
    renderPanel()
    expect(screen.getByText('Hanoi, VN')).toBeInTheDocument()
  })

  it('shows the day name', () => {
    renderPanel()
    expect(screen.getByText('Sunday')).toBeInTheDocument()
  })

  it('shows the formatted date', () => {
    renderPanel()
    expect(screen.getByText('Apr 28, 2024')).toBeInTheDocument()
  })

  it('shows current temperature rounded', () => {
    renderPanel()
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('shows temperature unit', () => {
    renderPanel()
    expect(screen.getAllByText('°C').length).toBeGreaterThan(0)
  })

  it('shows high and low temperatures', () => {
    renderPanel()
    expect(screen.getByText(/H: 32° L: 25°/)).toBeInTheDocument()
  })

  it('shows weather description from code', () => {
    renderPanel()
    expect(screen.getByText('Overcast')).toBeInTheDocument()
  })

  it('shows feels like temperature', () => {
    renderPanel()
    expect(screen.getByText(/Feels\s+29°C/)).toBeInTheDocument()
  })

  it('renders a weather icon svg', () => {
    const { container } = renderPanel()
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
