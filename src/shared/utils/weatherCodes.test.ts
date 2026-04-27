import { describe, it, expect } from 'vitest'
import { WEATHER_CODE_MAP } from './weatherCodes'

describe('WEATHER_CODE_MAP', () => {
  it('maps code 0 to "Clear sky"', () => {
    expect(WEATHER_CODE_MAP[0].label).toBe('Clear sky')
  })

  it('maps code 1 to "Mainly clear"', () => {
    expect(WEATHER_CODE_MAP[1].label).toBe('Mainly clear')
  })

  it('maps code 3 to "Overcast"', () => {
    expect(WEATHER_CODE_MAP[3].label).toBe('Overcast')
  })

  it('maps fog codes (45, 48) to fog labels', () => {
    expect(WEATHER_CODE_MAP[45].label).toBe('Fog')
    expect(WEATHER_CODE_MAP[48].label).toBe('Rime fog')
  })

  it('maps drizzle codes to drizzle labels', () => {
    expect(WEATHER_CODE_MAP[51].label).toBe('Light drizzle')
    expect(WEATHER_CODE_MAP[53].label).toBe('Moderate drizzle')
    expect(WEATHER_CODE_MAP[55].label).toBe('Dense drizzle')
  })

  it('maps rain codes to rain labels', () => {
    expect(WEATHER_CODE_MAP[61].label).toBe('Slight rain')
    expect(WEATHER_CODE_MAP[63].label).toBe('Moderate rain')
    expect(WEATHER_CODE_MAP[65].label).toBe('Heavy rain')
  })

  it('maps snow codes to snow labels', () => {
    expect(WEATHER_CODE_MAP[71].label).toBe('Light snow')
    expect(WEATHER_CODE_MAP[73].label).toBe('Moderate snow')
    expect(WEATHER_CODE_MAP[75].label).toBe('Heavy snow')
  })

  it('maps thunderstorm codes to thunderstorm labels', () => {
    expect(WEATHER_CODE_MAP[95].label).toBe('Thunderstorm')
    expect(WEATHER_CODE_MAP[96].label).toBe('Thunderstorm with hail')
    expect(WEATHER_CODE_MAP[99].label).toBe('Severe thunderstorm with hail')
  })

  it('every entry has a label and an icon', () => {
    for (const [code, meta] of Object.entries(WEATHER_CODE_MAP)) {
      expect(typeof meta.label, `code ${code} label`).toBe('string')
      expect(meta.icon, `code ${code} icon`).toBeDefined()
    }
  })
})
