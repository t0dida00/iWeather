import { describe, it, expect } from 'vitest'
import {
  convertMeterToKilometer,
  convertCelsiusToFahrenheit,
  ConvertFahrenheitToCelsius,
  convertStringToDateTime,
  convertStringToTime,
  convertStringToDay,
  normalizeDate,
  getCurrentHourDateTime,
  getCurrentDayDateTime,
  getCurrentDay,
  getRecentDateTimeIndex,
  getRecentDayIndexes,
  getDayIndex,
} from './common'

describe('convertMeterToKilometer', () => {
  it('converts 1000m to 1km', () => {
    expect(convertMeterToKilometer(1000)).toBe(1)
  })

  it('rounds 1500m to 2km', () => {
    expect(convertMeterToKilometer(1500)).toBe(2)
  })

  it('rounds 1499m to 1km', () => {
    expect(convertMeterToKilometer(1499)).toBe(1)
  })

  it('handles 0', () => {
    expect(convertMeterToKilometer(0)).toBe(0)
  })
})

describe('convertCelsiusToFahrenheit', () => {
  it('converts 0°C to 32°F', () => {
    expect(convertCelsiusToFahrenheit(0)).toBe(32)
  })

  it('converts 100°C to 212°F', () => {
    expect(convertCelsiusToFahrenheit(100)).toBe(212)
  })

  it('converts -40°C to -40°F', () => {
    expect(convertCelsiusToFahrenheit(-40)).toBe(-40)
  })
})

describe('ConvertFahrenheitToCelsius', () => {
  it('converts 32°F to 0°C', () => {
    expect(ConvertFahrenheitToCelsius(32)).toBe(0)
  })

  it('converts 212°F to 100°C', () => {
    expect(ConvertFahrenheitToCelsius(212)).toBe(100)
  })

  it('converts -40°F to -40°C', () => {
    expect(ConvertFahrenheitToCelsius(-40)).toBe(-40)
  })

  it('is inverse of convertCelsiusToFahrenheit', () => {
    expect(ConvertFahrenheitToCelsius(convertCelsiusToFahrenheit(37))).toBeCloseTo(37)
  })
})

describe('convertStringToDateTime', () => {
  it('formats ISO date string', () => {
    expect(convertStringToDateTime('2024-04-28T00:00')).toBe('Apr 28, 2024')
  })
})

describe('convertStringToTime', () => {
  it('extracts HH:MM from ISO datetime', () => {
    expect(convertStringToTime('2024-04-28T14:30')).toBe('14:30')
  })

  it('pads single-digit hours and minutes', () => {
    expect(convertStringToTime('2024-04-28T09:05')).toBe('09:05')
  })
})

describe('convertStringToDay', () => {
  it('returns correct day name for a known date', () => {
    expect(convertStringToDay('2024-04-28T00:00')).toBe('Sunday')
  })

  it('returns correct day for a Monday', () => {
    expect(convertStringToDay('2024-04-29T00:00')).toBe('Monday')
  })
})

describe('normalizeDate', () => {
  it('normalizes YYYY-MM-DD string unchanged', () => {
    expect(normalizeDate('2024-04-28')).toBe('2024-04-28')
  })

  it('normalizes ISO datetime by stripping time part', () => {
    expect(normalizeDate('2024-04-28T14:30')).toBe('2024-04-28')
  })

  it('normalizes DD/MM/YYYY format', () => {
    expect(normalizeDate('28/04/2024')).toBe('2024-04-28')
  })

  it('normalizes DD-MM-YYYY format', () => {
    expect(normalizeDate('28-04-2024')).toBe('2024-04-28')
  })

  it('pads single-digit month and day', () => {
    expect(normalizeDate('2024-4-5')).toBe('2024-04-05')
  })

  it('accepts a Date object', () => {
    expect(normalizeDate(new Date('2024-04-28T00:00:00'))).toBe('2024-04-28')
  })

  it('returns current day for "today"', () => {
    const today = getCurrentDay()
    expect(normalizeDate('today')).toBe(today)
    expect(normalizeDate('TODAY')).toBe(today)
  })
})

describe('getCurrentHourDateTime', () => {
  it('formats date as YYYY-MM-DDTHH:00', () => {
    const date = new Date('2024-04-28T14:30:00')
    expect(getCurrentHourDateTime(date)).toBe('2024-04-28T14:00')
  })
})

describe('getCurrentDayDateTime', () => {
  it('formats date as YYYY-MM-DDT00:00', () => {
    const date = new Date('2024-04-28T14:30:00')
    expect(getCurrentDayDateTime(date)).toBe('2024-04-28T00:00')
  })
})

describe('getCurrentDay', () => {
  it('formats date as YYYY-MM-DD', () => {
    const date = new Date('2024-04-28T14:30:00')
    expect(getCurrentDay(date)).toBe('2024-04-28')
  })
})

describe('getRecentDateTimeIndex', () => {
  const dateTimes = [
    '2024-04-28T10:00',
    '2024-04-28T11:00',
    '2024-04-28T12:00',
    '2024-04-28T13:00',
  ]

  it('returns index of last entry <= currentDateTime', () => {
    expect(getRecentDateTimeIndex(dateTimes, '2024-04-28T12:30')).toBe(2)
  })

  it('returns exact match index', () => {
    expect(getRecentDateTimeIndex(dateTimes, '2024-04-28T11:00')).toBe(1)
  })

  it('returns 0 when currentDateTime is before all entries', () => {
    expect(getRecentDateTimeIndex(dateTimes, '2024-04-28T09:00')).toBe(0)
  })

  it('returns last index when currentDateTime is after all entries', () => {
    expect(getRecentDateTimeIndex(dateTimes, '2024-04-28T14:00')).toBe(3)
  })

  it('returns -1 for empty array', () => {
    expect(getRecentDateTimeIndex([], '2024-04-28T12:00')).toBe(-1)
  })
})

describe('getRecentDayIndexes', () => {
  const dateTimes = [
    '2024-04-27T00:00',
    '2024-04-27T01:00',
    '2024-04-28T00:00',
    '2024-04-28T01:00',
    '2024-04-28T02:00',
  ]

  it('returns correct start and end for a found day', () => {
    expect(getRecentDayIndexes(dateTimes, '2024-04-28T00:00')).toEqual({ start: 2, end: 25 })
  })

  it('returns { start: -1, end: -1 } when day not found', () => {
    expect(getRecentDayIndexes(dateTimes, '2024-04-29T00:00')).toEqual({ start: -1, end: -1 })
  })
})

describe('getDayIndex', () => {
  const days = ['2024-04-26', '2024-04-27', '2024-04-28']

  it('returns correct index for a date that exists', () => {
    expect(getDayIndex(days, '2024-04-27')).toBe(1)
  })

  it('returns -1 for a date not in the array', () => {
    expect(getDayIndex(days, '2024-04-29')).toBe(-1)
  })
})
