/**
 * Rounds a number to the nearest integer for compact weather displays.
 * @example 24.6 -> 25
 */
export const roundNumber = (num: number): number => {
  const factor = Math.pow(10, 0);
  return Math.round(num * factor) / factor;
};
