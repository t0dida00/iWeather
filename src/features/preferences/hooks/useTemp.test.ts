import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTemp } from './useTemp'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('temperature-unit')
})

describe('useTemp', () => {
  it('defaults to "celsius" when localStorage is empty', () => {
    const { result } = renderHook(() => useTemp())
    expect(result.current.temp).toBe('celsius')
  })

  it('reads initial unit from localStorage', () => {
    localStorage.setItem('temp', 'fahrenheit')
    const { result } = renderHook(() => useTemp())
    expect(result.current.temp).toBe('fahrenheit')
  })

  it('sets temperature-unit attribute on documentElement', () => {
    const { result } = renderHook(() => useTemp())
    act(() => result.current.toggleTemp('fahrenheit'))
    expect(document.documentElement.getAttribute('temperature-unit')).toBe('fahrenheit')
  })

  it('persists unit to localStorage on toggle', () => {
    const { result } = renderHook(() => useTemp())
    act(() => result.current.toggleTemp('fahrenheit'))
    expect(localStorage.getItem('temp')).toBe('fahrenheit')
  })

  it('toggleTemp updates the temp state', () => {
    const { result } = renderHook(() => useTemp())
    act(() => result.current.toggleTemp('fahrenheit'))
    expect(result.current.temp).toBe('fahrenheit')
    act(() => result.current.toggleTemp('celsius'))
    expect(result.current.temp).toBe('celsius')
  })

  it('converts search history temperatures from celsius to fahrenheit on toggle', () => {
    const history = [
      { name: 'Hanoi', latitude: 21, longitude: 105, country: 'VN', country_code: 'VN', tempHigh: 30, tempLow: 20 },
    ]
    localStorage.setItem('search_history', JSON.stringify(history))

    const { result } = renderHook(() => useTemp())
    act(() => result.current.toggleTemp('fahrenheit'))

    const stored = JSON.parse(localStorage.getItem('search_history')!)
    expect(stored[0].tempHigh).toBeCloseTo(86)
    expect(stored[0].tempLow).toBeCloseTo(68)
  })

  it('converts search history temperatures from fahrenheit to celsius on toggle', () => {
    localStorage.setItem('temp', 'fahrenheit')
    const history = [
      { name: 'Hanoi', latitude: 21, longitude: 105, country: 'VN', country_code: 'VN', tempHigh: 86, tempLow: 68 },
    ]
    localStorage.setItem('search_history', JSON.stringify(history))

    const { result } = renderHook(() => useTemp())
    act(() => result.current.toggleTemp('celsius'))

    const stored = JSON.parse(localStorage.getItem('search_history')!)
    expect(stored[0].tempHigh).toBeCloseTo(30)
    expect(stored[0].tempLow).toBeCloseTo(20)
  })

  it('does not convert history when toggling to same unit', () => {
    const history = [
      { name: 'Hanoi', latitude: 21, longitude: 105, country: 'VN', country_code: 'VN', tempHigh: 30, tempLow: 20 },
    ]
    localStorage.setItem('search_history', JSON.stringify(history))

    const { result } = renderHook(() => useTemp())
    act(() => result.current.toggleTemp('celsius'))

    const stored = JSON.parse(localStorage.getItem('search_history')!)
    expect(stored[0].tempHigh).toBe(30)
    expect(stored[0].tempLow).toBe(20)
  })
})
