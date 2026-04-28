import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CitiesPage } from './CitiesPage'

vi.mock('../features/search/hooks/useSearchHistory')
vi.mock('../features/weather/hooks/useWeatherData')
import { useSearchHistory } from '../features/search/hooks/useSearchHistory'
import { useWeatherData } from '../features/weather/hooks/useWeatherData'

const mockUseSearchHistory = vi.mocked(useSearchHistory)
const mockUseWeatherData = vi.mocked(useWeatherData)

const mockHistory = [
  {
    name: 'Hanoi',
    country: 'Vietnam',
    country_code: 'VN',
    latitude: 21.0,
    longitude: 105.0,
    tempHigh: 32,
    tempLow: 25,
    weatherCode: 3,
  },
  {
    name: 'Ho Chi Minh City',
    country: 'Vietnam',
    country_code: 'VN',
    latitude: 10.8,
    longitude: 106.6,
    tempHigh: 35,
    tempLow: 27,
    weatherCode: 0,
  },
]

const renderPage = () =>
  render(
    <MemoryRouter>
      <CitiesPage />
    </MemoryRouter>
  )

beforeEach(() => {
  vi.clearAllMocks()
  mockUseWeatherData.mockReturnValue({
    data: undefined,
    todayWeatherData: null,
    oneDayHourlyData: null,
    sevenDayData: null,
    selectedDay: '',
    setSelectedDay: vi.fn(),
    isError: false,
    isPending: false,
    error: null,
  })
})

describe('CitiesPage — empty state', () => {
  beforeEach(() => {
    mockUseSearchHistory.mockReturnValue({
      history: [],
      addToHistory: vi.fn(),
      updateHistory: vi.fn(),
      clearHistory: vi.fn(),
    })
  })

  it('shows the Cities heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Cities' })).toBeInTheDocument()
  })

  it('shows the subtitle text', () => {
    renderPage()
    expect(
      screen.getByText('Browse weather for your most recently searched locations.')
    ).toBeInTheDocument()
  })

  it('shows the empty state message when history is empty', () => {
    renderPage()
    expect(
      screen.getByText(
        'No recent cities found. Search for a location to populate this list.'
      )
    ).toBeInTheDocument()
  })

  it('does not render any city cards when history is empty', () => {
    renderPage()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})

describe('CitiesPage — with data', () => {
  beforeEach(() => {
    mockUseSearchHistory.mockReturnValue({
      history: mockHistory,
      addToHistory: vi.fn(),
      updateHistory: vi.fn(),
      clearHistory: vi.fn(),
    })
    mockUseWeatherData.mockImplementation(({ lat }) => ({
      data: undefined,
      todayWeatherData: {
        temperature: 30,
        apparentTemperature: 31,
        humidity: 80,
        weatherCode: lat === 21.0 ? 3 : 0,
        windSpeed: 10,
        windDirection: 90,
        datetime: '2024-04-28T10:00',
        tempHigh: lat === 21.0 ? 32 : 35,
        tempLow: lat === 21.0 ? 25 : 27,
        sunrise: '2024-04-28T05:30',
        sunset: '2024-04-28T18:30',
        temperatureUnit: '°C',
        windSpeedUnit: 'km/h',
        visibility: 10000,
        uvIndex: 5,
        windDirectionUnit: '°',
        visibilityUnit: 'm',
        uvIndexUnit: '',
      },
      oneDayHourlyData: null,
      sevenDayData: null,
      selectedDay: '',
      setSelectedDay: vi.fn(),
      isError: false,
      isPending: false,
      error: null,
    }))
  })

  it('does not show the empty state message', () => {
    renderPage()
    expect(
      screen.queryByText(/No recent cities found/)
    ).not.toBeInTheDocument()
  })

  it('renders a card for each history entry', () => {
    renderPage()
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })

  it('displays city names', () => {
    renderPage()
    expect(screen.getByText('Hanoi')).toBeInTheDocument()
    expect(screen.getByText('Ho Chi Minh City')).toBeInTheDocument()
  })

  it('displays country names', () => {
    renderPage()
    expect(screen.getAllByText('Vietnam')).toHaveLength(2)
  })

  it('displays weather condition labels', () => {
    renderPage()
    expect(screen.getByText('Overcast')).toBeInTheDocument()  // code 3
    expect(screen.getByText('Clear sky')).toBeInTheDocument() // code 0
  })

  it('displays tempHigh and tempLow formatted with degree symbol', () => {
    renderPage()
    expect(screen.getByText('32°')).toBeInTheDocument()
    expect(screen.getByText('/25°')).toBeInTheDocument()
  })

  it('shows -- for missing temperature values', () => {
    mockUseWeatherData.mockReturnValue({
      data: undefined,
      todayWeatherData: null,
      oneDayHourlyData: null,
      sevenDayData: null,
      selectedDay: '',
      setSelectedDay: vi.fn(),
      isError: false,
      isPending: false,
      error: null,
    })
    renderPage()
    expect(screen.getAllByText('/--')).toHaveLength(2)
    expect(screen.getAllByText('--')).toHaveLength(2)
  })

  it('shows Unknown for missing weather code', () => {
    mockUseWeatherData.mockReturnValue({
      data: undefined,
      todayWeatherData: null,
      oneDayHourlyData: null,
      sevenDayData: null,
      selectedDay: '',
      setSelectedDay: vi.fn(),
      isError: false,
      isPending: false,
      error: null,
    })
    renderPage()
    expect(screen.getAllByText('Unknown')).toHaveLength(2)
  })
})
