export type Coordinates = {
    lat: number
    lon: number
}

export type TodayWeatherData ={
    temperature: number
    apparentTemperature: number
    humidity: number
    weatherCode: number
    windSpeed: number
    windDirection: number
    datetime: string
    tempHigh: number
    tempLow: number
    sunrise: string
    sunset: string
    temperatureUnit: string
    windSpeedUnit: string
    visibility: number
    uvIndex: number
    windDirectionUnit: string
    visibilityUnit: string
    uvIndexUnit: string

}