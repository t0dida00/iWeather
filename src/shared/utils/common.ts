/**
 * Converts meters to rounded kilometers for display.
 * @example 1500 -> 2
 */
export function convertMeterToKilometer(meter: number): number {
  return Math.round(meter / 1000);
}

/**
 * Converts a Celsius temperature value to Fahrenheit.
 * @example 0 -> 32
 */
export function convertCelsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32
}

/**
 * Converts a Fahrenheit temperature value to Celsius.
 * @example 32 -> 0
 */
export function ConvertFahrenheitToCelsius(fahrenheit: number): number {
    return ((fahrenheit - 32) * 5) / 9
}

/**
 * Formats an API datetime string as a short US date.
 * @example "2024-04-28T00:00" -> "Apr 28, 2024"
 */
export function convertStringToDateTime(dateTimeStr: string): string {
  return new Date(dateTimeStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Extracts local 24-hour time from an API datetime string.
 * @example "2024-04-28T14:30" -> "14:30"
 */
export function convertStringToTime(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

/**
 * Formats a React Query update timestamp as display time.
 * @example new Date("2024-04-28T14:30:00").getTime() -> "14:30"
 * @example undefined -> "--"
 */
export function formatLatestUpdateTime(timestamp?: number): string {
    if (!timestamp) {
        return '--'
    }

    return convertStringToTime(new Date(timestamp).toISOString())
}

/**
 * Returns the newest positive timestamp from a list of query update timestamps.
 * @example [0, 1000, 3000, 2000] -> 3000
 * @example [0] -> undefined
 */
export function getLatestTimestamp(timestamps: number[]): number | undefined {
    const validTimestamps = timestamps.filter((timestamp) => timestamp > 0)

    if (!validTimestamps.length) {
        return undefined
    }

    return Math.max(...validTimestamps)
}

/**
 * Converts an API datetime string into a weekday name.
 * @example "2024-04-28T00:00" -> "Sunday"
 */
export function convertStringToDay(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

const padDatePart = (value: number): string => value.toString().padStart(2, '0')

/**
 * Normalizes Date, ISO, YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY, or "today" into YYYY-MM-DD.
 * @example "2024-04-28T14:30" -> "2024-04-28"
 * @example "28/04/2024" -> "2024-04-28"
 */
export function normalizeDate(dateInput: string | Date = new Date()): string {
    if (dateInput instanceof Date) {
        return `${dateInput.getFullYear()}-${padDatePart(dateInput.getMonth() + 1)}-${padDatePart(dateInput.getDate())}`
    }

    if (dateInput.toLowerCase() === 'today') {
        return getCurrentDay()
    }

    const [datePart] = dateInput.split('T')
    const dateParts = datePart.split(/[/-]/)

    if (dateParts.length !== 3) {
        return datePart
    }

    if (dateParts[0].length === 4) {
        const [year, month, day] = dateParts
        return `${year}-${padDatePart(Number(month))}-${padDatePart(Number(day))}`
    }

    const [day, month, year] = dateParts
    return `${year}-${padDatePart(Number(month))}-${padDatePart(Number(day))}`
}

/**
 * Formats a date as YYYY-MM-DDTHH:00 using the date's current hour.
 * @example new Date("2024-04-28T14:30:00") -> "2024-04-28T14:00"
 */
export function getCurrentHourDateTime(date = new Date()): string {
    return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}T${padDatePart(date.getHours())}:00`
}

/**
 * Combines a selected day with the current hour from another date as YYYY-MM-DDTHH:00.
 * @example ("2024-04-28", new Date("2024-04-29T09:15:00")) -> "2024-04-28T09:00"
 */
export function getHourDateTimeForDay(dateInput: string | Date = new Date(), date = new Date()): string {
    return `${normalizeDate(dateInput)}T${padDatePart(date.getHours())}:00`
}

/**
 * Formats a date as the start of its day: YYYY-MM-DDT00:00.
 * @example new Date("2024-04-28T14:30:00") -> "2024-04-28T00:00"
 */
export function getCurrentDayDateTime(date = new Date()): string {
    return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}T00:00`
}

/**
 * Formats a date as YYYY-MM-DD.
 * @example new Date("2024-04-28T14:30:00") -> "2024-04-28"
 */
export function getCurrentDay(date = new Date()): string {
    return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`
}

/**
 * Finds the last datetime index at or before currentDateTime, or 0 when all entries are later.
 * @example (["2024-04-28T10:00", "2024-04-28T12:00"], "2024-04-28T11:00") -> 0
 */
export function getRecentDateTimeIndex(dateTimes: string[], currentDateTime = getCurrentHourDateTime()): number {
    if (!dateTimes.length) {
        return -1
    }

    const currentTime = new Date(currentDateTime).getTime()

    const recentIndex = dateTimes.findLastIndex((dateTime) => {
        return new Date(dateTime).getTime() <= currentTime
    })

    return recentIndex === -1 ? 0 : recentIndex
}

/**
 * Returns the 24-hour start/end indexes for a selected day inside an hourly datetime array.
 * @example (["2024-04-28T00:00"], "2024-04-28") -> { start: 0, end: 23 }
 */
export function getRecentDayIndexes(dateTimes: string[], currentDayDateTime: string | Date = getCurrentDayDateTime()): { start: number; end: number } {
    const start = dateTimes.findIndex((dateTime) => dateTime === `${normalizeDate(currentDayDateTime)}T00:00`)

    if (start === -1) {
        return { start: -1, end: -1 }
    }

    return {
        start,
        end: start + 23
    }
}

/**
 * Finds a normalized day inside a daily date array.
 * @example (["2024-04-26", "2024-04-27"], "2024-04-27") -> 1
 */
export function getDayIndex(dateTimes: string[], currentDay: string | Date = getCurrentDay()): number {
    return dateTimes.findIndex((dateTime) => dateTime === normalizeDate(currentDay))
}
