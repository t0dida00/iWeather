import { describe, it, expect } from 'vitest'
import { roundNumber } from './roundNumber'

describe('roundNumber', () => {
  it('rounds 1.5 to 2', () => {
    expect(roundNumber(1.5)).toBe(2)
  })

  it('rounds 1.4 to 1', () => {
    expect(roundNumber(1.4)).toBe(1)
  })

  it('rounds negative -1.5 to -1', () => {
    expect(roundNumber(-1.5)).toBe(-1)
  })

  it('leaves integers unchanged', () => {
    expect(roundNumber(5)).toBe(5)
    expect(roundNumber(0)).toBe(0)
    expect(roundNumber(-3)).toBe(-3)
  })

  it('rounds to nearest integer (no decimals in output)', () => {
    expect(Number.isInteger(roundNumber(3.7))).toBe(true)
  })
})
