import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TodaysHighlight } from './TodaysHighlight'
import type { TodayWeatherData } from '../types'

const data: TodayWeatherData = {
  datetime: '2024-04-28T09:00',
  temperature: 25,
  apparentTemperature: 29,
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

describe('TodaysHighlight', () => {
  it('renders the Metrics heading', () => {
    render(<TodaysHighlight data={data} />)
    expect(screen.getByRole('heading', { name: 'Metrics' })).toBeInTheDocument()
  })

  it('shows Wind Status label and value', () => {
    render(<TodaysHighlight data={data} />)
    expect(screen.getByText('Wind Status')).toBeInTheDocument()
    expect(screen.getByText('11.8')).toBeInTheDocument()
    expect(screen.getByText('km/h')).toBeInTheDocument()
    expect(screen.getByText(/NW - 149°/)).toBeInTheDocument()
  })

  it('shows Humidity label and value', () => {
    render(<TodaysHighlight data={data} />)
    expect(screen.getByText('Humidity')).toBeInTheDocument()
    expect(screen.getByText('96')).toBeInTheDocument()
    expect(screen.getByText('%')).toBeInTheDocument()
  })

  it('shows Sunrise label and time', () => {
    render(<TodaysHighlight data={data} />)
    expect(screen.getByText('Sunrise')).toBeInTheDocument()
    expect(screen.getByText('05:28')).toBeInTheDocument()
  })

  it('shows UV Index label and value', () => {
    render(<TodaysHighlight data={data} />)
    expect(screen.getByText('UV Index')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('UV')).toBeInTheDocument()
  })

  it('shows Visibility label and value in km', () => {
    render(<TodaysHighlight data={data} />)
    expect(screen.getByText('Visibility')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('KM')).toBeInTheDocument()
  })

  it('shows Sunset label and time', () => {
    render(<TodaysHighlight data={data} />)
    expect(screen.getByText('Sunset')).toBeInTheDocument()
    expect(screen.getByText('18:20')).toBeInTheDocument()
  })

  it('renders exactly 6 metric cards', () => {
    render(<TodaysHighlight data={data} />)
    // Each inner metric card has a unique label — count the label spans
    const labels = ['Wind Status', 'Humidity', 'Sunrise', 'UV Index', 'Visibility', 'Sunset']
    labels.forEach((label) => expect(screen.getByText(label)).toBeInTheDocument())
    expect(labels).toHaveLength(6)
  })
})
