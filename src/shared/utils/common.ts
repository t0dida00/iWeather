export function convertMeterToKilometer(meter: number): number {
  return Math.round(meter / 1000);
}

export function convertStringToDateTime(dateTimeStr: string): string {
  return new Date(dateTimeStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function convertStringToTime(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function convertStringToDay(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

