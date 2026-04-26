export const roundNumber = (num: number): number => {
  const factor = Math.pow(10, 0);
  return Math.round(num * factor) / factor;
};
