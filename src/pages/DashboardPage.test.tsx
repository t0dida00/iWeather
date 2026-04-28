import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './DashboardPage'

// ── mock hooks ──────────────────────────────────────────────────────────────
vi.mock('../features/weather/hooks/useOverviewParams')
vi.mock('../features/weather/hooks/useWeatherData')
vi.mock('../features/search/hooks/useSearchHistory')

import { useOverviewParams } from '../features/weather/hooks/useOverviewParams'
import { useWeatherData } from '../features/weather/hooks/useWeatherData'
import { useSearchHistory } from '../features/search/hooks/useSearchHistory'

// ── mock child components that need external APIs/context ────────────────────
vi.mock('../features/weather/components/OtherCities', () => ({
  OtherCities: () => <div data-testid="other-cities" />,
}))
vi.mock('../features/weather/components/TwentyFourHourForecast', () => ({
  TwentyFourHourForecast: () => <div data-testid="24h-forecast" />,
}))

const mockUseOverviewParams = vi.mocked(useOverviewParams)
const mockUseWeatherData   = vi.mocked(useWeatherData)
const mockUseSearchHistory = vi.mocked(useSearchHistory)

const todayWeatherData = {
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

const sevenDayData = {
  date: ['2024-04-28','2024-04-29','2024-04-30','2024-05-01','2024-05-02','2024-05-03','2024-05-04'],
  tempHigh: [32, 29, 28, 30, 32, 31, 29],
  tempLow:  [25, 22, 20, 21, 23, 25, 23],
  weatherCode: [95, 81, 3, 3, 95, 81, 81],
  temperatureUnit: '°C',
}

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/overview']}>
      <Routes>
        <Route path="/overview" element={<DashboardPage />} />
        <Route path="/cities" element={<div>Cities Page</div>} />
      </Routes>
    </MemoryRouter>
  )

beforeEach(() => {
  vi.clearAllMocks()

  mockUseOverviewParams.mockReturnValue({ lat: 21.0, lon: 105.0, city: 'Hanoi', code: 'VN' })
  mockUseSearchHistory.mockReturnValue({
    history: [],
    addToHistory: vi.fn(),
    updateHistory: vi.fn(),
    clearHistory: vi.fn(),
  })
  mockUseWeatherData.mockReturnValue({
    data: undefined,
    todayWeatherData,
    oneDayHourlyData: null,
    sevenDayData,
    selectedDay: '2024-04-28',
    setSelectedDay: vi.fn(),
    isError: false,
    isPending: false,
    error: null,
  })
})

describe('DashboardPage — loading / error states', () => {
  it('shows loading message while pending', () => {
    mockUseWeatherData.mockReturnValue({
      data: undefined, todayWeatherData: null, oneDayHourlyData: null,
      sevenDayData: null, selectedDay: '', setSelectedDay: vi.fn(),
      isError: false, isPending: true, error: null,
    })
    renderPage()
    expect(screen.getByText('Loading weather...')).toBeInTheDocument()
  })

  it('shows error message on fetch failure', () => {
    mockUseWeatherData.mockReturnValue({
      data: undefined, todayWeatherData: null, oneDayHourlyData: null,
      sevenDayData: null, selectedDay: '', setSelectedDay: vi.fn(),
      isError: true, isPending: false, error: new Error('fail'),
    })
    renderPage()
    expect(screen.getByText('Error loading weather data.')).toBeInTheDocument()
  })

  it('shows missing data message when todayWeatherData is null', () => {
    mockUseWeatherData.mockReturnValue({
      data: undefined, todayWeatherData: null, oneDayHourlyData: null,
      sevenDayData: null, selectedDay: '', setSelectedDay: vi.fn(),
      isError: false, isPending: false, error: null,
    })
    renderPage()
    expect(screen.getByText('No weather data available.')).toBeInTheDocument()
  })
})

describe('DashboardPage — CurrentWeatherPanel', () => {
  it('shows city and country code', () => {
    renderPage()
    expect(screen.getByText('Hanoi, VN')).toBeInTheDocument()
  })

  it('shows the day name', () => {
    renderPage()
    expect(screen.getAllByText('Sunday').length).toBeGreaterThan(0)
  })

  it('shows the formatted date', () => {
    renderPage()
    expect(screen.getByText('Apr 28, 2024')).toBeInTheDocument()
  })

  it('shows current temperature', () => {
    renderPage()
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('shows high / low temperatures', () => {
    renderPage()
    expect(screen.getByText(/H: 32° L: 25°/)).toBeInTheDocument()
  })

  it('shows weather description', () => {
    renderPage()
    expect(screen.getAllByText('Overcast').length).toBeGreaterThan(0)
  })

  it('shows feels like temperature', () => {
    renderPage()
    expect(screen.getByText(/Feels\s+29°C/)).toBeInTheDocument()
  })

  it('renders a weather icon', () => {
    const { container } = renderPage()
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})

describe('DashboardPage — TodaysHighlight (Metrics)', () => {
  it('renders the Metrics heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Metrics' })).toBeInTheDocument()
  })

  it('shows all 6 metric labels', () => {
    renderPage()
    const labels = ['Wind Status', 'Humidity', 'Sunrise', 'UV Index', 'Visibility', 'Sunset']
    labels.forEach((label) => expect(screen.getByText(label)).toBeInTheDocument())
  })

  it('shows wind speed value', () => {
    renderPage()
    expect(screen.getByText('11.8')).toBeInTheDocument()
  })

  it('shows sunrise and sunset times', () => {
    renderPage()
    expect(screen.getByText('05:28')).toBeInTheDocument()
    expect(screen.getByText('18:20')).toBeInTheDocument()
  })

  it('shows visibility in km', () => {
    renderPage()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('KM')).toBeInTheDocument()
  })
})

describe('DashboardPage — SevenDayForecast', () => {
  it('renders the 7-Day Forecast heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: '7-Day Forecast' })).toBeInTheDocument()
  })

  it('renders 7 day cards', () => {
    renderPage()
    expect(screen.getAllByRole('button', { name: /:/i }).length).toBeGreaterThanOrEqual(7)
  })

  it('shows day names', () => {
    renderPage()
    expect(screen.getAllByText('Sunday').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Monday').length).toBeGreaterThan(0)
  })

  it('shows tempHigh and tempLow', () => {
    renderPage()
    expect(screen.getAllByText('32°').length).toBeGreaterThan(0)
    expect(screen.getAllByText('/25°').length).toBeGreaterThan(0)
  })

  it('shows weather descriptions in forecast', () => {
    renderPage()
    expect(screen.getAllByText('Thunderstorm').length).toBeGreaterThan(0)
  })
})

describe('DashboardPage — back button', () => {
  it('renders the back button', () => {
    renderPage()
    expect(screen.getByRole('button', { name: 'Go back' })).toBeInTheDocument()
  })

  it('navigates to /cities when back button is clicked', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: 'Go back' }))
    expect(screen.getByText('Cities Page')).toBeInTheDocument()
  })
})
