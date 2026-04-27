import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

describe('useTheme', () => {
  it('defaults to "light" when localStorage is empty', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('reads initial theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('sets data-theme attribute on documentElement', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggleTheme('dark'))
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('persists theme to localStorage on toggle', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggleTheme('dark'))
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('toggleTheme updates the theme state', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggleTheme('dark'))
    expect(result.current.theme).toBe('dark')
    act(() => result.current.toggleTheme('light'))
    expect(result.current.theme).toBe('light')
  })
})
