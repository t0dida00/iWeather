import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SevenDayForecast } from './SevenDayForecast'
import type { SevenDayWeatherData } from '../types'

const data: SevenDayWeatherData = {
  date: [
    '2024-04-28',
    '2024-04-29',
    '2024-04-30',
    '2024-05-01',
    '2024-05-02',
    '2024-05-03',
    '2024-05-04',
  ],
  tempHigh: [32, 29, 28, 30, 32, 31, 29],
  tempLow:  [25, 22, 20, 21, 23, 25, 23],
  weatherCode: [95, 81, 3, 3, 95, 81, 81],
  temperatureUnit: '°C',
}

describe('SevenDayForecast', () => {
  it('renders the 7-Day Forecast heading', () => {
    render(<SevenDayForecast data={data} />)
    expect(screen.getByRole('heading', { name: '7-Day Forecast' })).toBeInTheDocument()
  })

  it('renders 7 day cards', () => {
    render(<SevenDayForecast data={data} />)
    expect(screen.getAllByRole('button')).toHaveLength(7)
  })

  it('shows day names for each date', () => {
    render(<SevenDayForecast data={data} />)
    expect(screen.getByText('Sunday')).toBeInTheDocument()   // 2024-04-28
    expect(screen.getByText('Monday')).toBeInTheDocument()   // 2024-04-29
    expect(screen.getByText('Tuesday')).toBeInTheDocument()  // 2024-04-30
  })

  it('shows high and low temps for each day', () => {
    render(<SevenDayForecast data={data} />)
    expect(screen.getAllByText('32°').length).toBeGreaterThan(0)
    expect(screen.getAllByText('/25°').length).toBeGreaterThan(0)
  })

  it('shows weather description for each day', () => {
    render(<SevenDayForecast data={data} />)
    expect(screen.getAllByText('Thunderstorm').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Heavy rain showers').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Overcast').length).toBeGreaterThan(0)
  })

  it('renders a weather icon svg for each day', () => {
    const { container } = render(<SevenDayForecast data={data} />)
    const svgs = container.querySelectorAll('article svg')
    expect(svgs.length).toBe(7)
  })

  it('calls onSelectDay with the date when a day is clicked', async () => {
    const onSelectDay = vi.fn()
    render(<SevenDayForecast data={data} onSelectDay={onSelectDay} />)
    await userEvent.click(screen.getAllByRole('button')[1])
    expect(onSelectDay).toHaveBeenCalledWith('2024-04-29')
  })

  it('marks the selected day card as active via aria-label', () => {
    render(<SevenDayForecast data={data} selectedDay="2024-04-28" />)
    const mondayCard = screen.getByRole('button', { name: /Sunday/ })
    expect(mondayCard).toBeInTheDocument()
  })

  it('renders nothing when data is null', () => {
    const { container } = render(<SevenDayForecast data={null} />)
    expect(container.firstChild).toBeNull()
  })
})
