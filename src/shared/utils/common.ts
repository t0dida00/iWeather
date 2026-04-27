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

const padDatePart = (value: number): string => value.toString().padStart(2, '0')

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

export function getCurrentHourDateTime(date = new Date()): string {
    return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}T${padDatePart(date.getHours())}:00`
}

export function getHourDateTimeForDay(dateInput: string | Date = new Date(), date = new Date()): string {
    return `${normalizeDate(dateInput)}T${padDatePart(date.getHours())}:00`
}

export function getCurrentDayDateTime(date = new Date()): string {
    return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}T00:00`
}

export function getCurrentDay(date = new Date()): string {
    return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`
}

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

export function getDayIndex(dateTimes: string[], currentDay: string | Date = getCurrentDay()): number {
    return dateTimes.findIndex((dateTime) => dateTime === normalizeDate(currentDay))
}
