import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSearchHistory } from './useSearchHistory'

const entry1 = { name: 'Hanoi', country: 'Vietnam', country_code: 'VN', latitude: 21.0, longitude: 105.0 }
const entry2 = { name: 'Ho Chi Minh', country: 'Vietnam', country_code: 'VN', latitude: 10.8, longitude: 106.6 }

beforeEach(() => {
  localStorage.clear()
})

describe('useSearchHistory', () => {
  it('initialises with empty history', () => {
    const { result } = renderHook(() => useSearchHistory())
    expect(result.current.history).toEqual([])
  })

  it('reads existing history from localStorage', () => {
    localStorage.setItem('search_history', JSON.stringify([entry1]))
    const { result } = renderHook(() => useSearchHistory())
    expect(result.current.history).toHaveLength(1)
    expect(result.current.history[0].name).toBe('Hanoi')
  })

  it('addToHistory prepends a new entry', () => {
    const { result } = renderHook(() => useSearchHistory())
    act(() => result.current.addToHistory(entry1))
    act(() => result.current.addToHistory(entry2))
    expect(result.current.history[0].name).toBe('Ho Chi Minh')
    expect(result.current.history[1].name).toBe('Hanoi')
  })

  it('addToHistory deduplicates by lat/lon and moves to top', () => {
    const { result } = renderHook(() => useSearchHistory())
    act(() => result.current.addToHistory(entry1))
    act(() => result.current.addToHistory(entry2))
    act(() => result.current.addToHistory(entry1))
    expect(result.current.history).toHaveLength(2)
    expect(result.current.history[0].name).toBe('Hanoi')
  })

  it('addToHistory caps history at 10 items', () => {
    const { result } = renderHook(() => useSearchHistory())
    for (let i = 0; i < 12; i++) {
      act(() => result.current.addToHistory({ ...entry1, latitude: i, longitude: i }))
    }
    expect(result.current.history).toHaveLength(10)
  })

  it('updateHistory updates fields for a matching entry', () => {
    const { result } = renderHook(() => useSearchHistory())
    act(() => result.current.addToHistory(entry1))
    act(() => result.current.updateHistory(21.0, 105.0, { tempHigh: 35, tempLow: 25, weatherCode: 3 }))
    expect(result.current.history[0].tempHigh).toBe(35)
    expect(result.current.history[0].tempLow).toBe(25)
    expect(result.current.history[0].weatherCode).toBe(3)
  })

  it('updateHistory does not write if nothing changed', () => {
    const { result } = renderHook(() => useSearchHistory())
    act(() => result.current.addToHistory({ ...entry1, tempHigh: 35 }))
    const before = localStorage.getItem('search_history')
    act(() => result.current.updateHistory(21.0, 105.0, { tempHigh: 35 }))
    expect(localStorage.getItem('search_history')).toBe(before)
  })

  it('updateHistory ignores entries that do not match', () => {
    const { result } = renderHook(() => useSearchHistory())
    act(() => result.current.addToHistory(entry1))
    act(() => result.current.updateHistory(99.0, 99.0, { tempHigh: 99 }))
    expect(result.current.history[0].tempHigh).toBeUndefined()
  })

  it('clearHistory empties the history and localStorage', () => {
    const { result } = renderHook(() => useSearchHistory())
    act(() => result.current.addToHistory(entry1))
    act(() => result.current.clearHistory())
    expect(result.current.history).toEqual([])
    expect(localStorage.getItem('search_history')).toBeNull()
  })
})
