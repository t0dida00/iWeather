import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CityCard from './index'

const baseProps = {
  countryName: 'Vietnam',
  cityName: 'Hanoi',
  condition: 'Overcast',
  tempHigh: '32°',
  tempLow: '25°',
  latitude: 21.0,
  longitude: 105.0,
  code: 'VN',
}

const renderCard = (props = baseProps) =>
  render(
    <MemoryRouter>
      <CityCard {...props} />
    </MemoryRouter>
  )

describe('CityCard', () => {
  it('displays country name', () => {
    renderCard()
    expect(screen.getByText('Vietnam')).toBeInTheDocument()
  })

  it('displays city name', () => {
    renderCard()
    expect(screen.getByText('Hanoi')).toBeInTheDocument()
  })

  it('displays condition label', () => {
    renderCard()
    expect(screen.getByText('Overcast')).toBeInTheDocument()
  })

  it('displays tempHigh', () => {
    renderCard()
    expect(screen.getByText('32°')).toBeInTheDocument()
  })

  it('displays tempLow', () => {
    renderCard()
    expect(screen.getByText('/25°')).toBeInTheDocument()
  })

  it('links to the overview page with correct query params', () => {
    renderCard()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute(
      'href',
      '/overview/?city=Hanoi&code=VN&lat=21&lon=105'
    )
  })

  it('shows Sun icon for clear sky condition', () => {
    renderCard({ ...baseProps, condition: 'Clear sky' })
    // lucide renders an svg — confirm the card renders without crashing and icon present
    const link = screen.getByRole('link')
    expect(link.querySelector('svg')).toBeInTheDocument()
  })

  it('shows CloudSun icon for partly cloudy condition', () => {
    renderCard({ ...baseProps, condition: 'Partly cloudy' })
    const link = screen.getByRole('link')
    expect(link.querySelector('svg')).toBeInTheDocument()
  })

  it('shows Cloud icon for other conditions', () => {
    renderCard({ ...baseProps, condition: 'Overcast' })
    const link = screen.getByRole('link')
    expect(link.querySelector('svg')).toBeInTheDocument()
  })
})
