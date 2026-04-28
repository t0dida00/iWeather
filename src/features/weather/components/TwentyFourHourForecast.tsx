import { useEffect, useMemo, useRef, useState } from 'react'
import { graphic, init, use as registerECharts } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import Card from '../../../shared/ui/Card'
import styles from './TwentyFourHourForecast.module.scss'
import type { TwentyFourHourWeatherData } from '../types'
import { roundNumber } from '../../../shared/utils/roundNumber'
import { WEATHER_CODE_MAP } from '../../../shared/utils/weatherCodes'
import { convertStringToTime } from '../../../shared/utils/common'

// Register ECharts components at the module level (not a React hook)
registerECharts([LineChart, GridComponent, TooltipComponent, CanvasRenderer])

type ForecastTab = 'temperature' | 'rain' | 'wind'

type TooltipParam = {
  name: string
  value: number
}

export function TwentyFourHourForecast(data: { data: TwentyFourHourWeatherData | null }) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<ForecastTab>('temperature')
  const forecastTimes = useMemo(() => data.data?.time.map(convertStringToTime) || [], [data.data?.time])

  const forecastData = useMemo(() => {
    if (!data.data) {
      return null
    }

    return {
    temperature: {
      unit: data.data?.temperatureUnit || '°C',
      min: roundNumber(data.data?.tempLow) - 3,
      max: roundNumber(data.data?.tempHigh) + 3,
      color: '#e0a326',
      values: data.data.temperature.map(temp => roundNumber(temp)),
      areaStart: 'rgba(224, 163, 38, 0.34)',
      areaEnd: 'rgba(224, 163, 38, 0.02)'
    },
    rain: {
      unit: '%',
      min: 0,
      max: data.data.precipitationProbabilityMax + 5,
      color: '#78aef7',
      values: data.data.precipitationProbability.map(prob => roundNumber(prob)),
      areaStart: 'rgba(120, 174, 247, 0.28)',
      areaEnd: 'rgba(120, 174, 247, 0.02)'
    },
    wind: {
      unit: data.data?.windSpeedUnit || 'm/s',
      min: 0,
      max: data.data.windSpeedMax + 5,
      color: '#5f8cff',
      values: data.data.windSpeed.map(speed => roundNumber(speed)),
      areaStart: 'rgba(95, 140, 255, 0.22)',
      areaEnd: 'rgba(95, 140, 255, 0.02)'
    }
    }
  }, [data.data])
  useEffect(() => {
    if (!chartRef.current || !forecastData) {
      return
    }

    const chart = init(chartRef.current)
    const currentForecast = forecastData[activeTab]

    const setChartOptions = () => {
      const rootStyles = getComputedStyle(document.documentElement)
      const primaryColor = rootStyles.getPropertyValue('--color-primary').trim() || '#111827'
      const cardBackground = rootStyles.getPropertyValue('--card-background').trim() || '#ffffff'
      const cardBorder = rootStyles.getPropertyValue('--card-border').trim() || '#e4e4e4'

      chart.setOption({
        animation: false,
        grid: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 24
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: forecastTimes,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          min: currentForecast.min,
          max: currentForecast.max,
          show: false
        },
        series: [
          {
            type: 'line',
            data: currentForecast.values,
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              color: currentForecast.color,
              width: 2
            },
            itemStyle: {
              color: currentForecast.color,
              borderColor: currentForecast.color,
              borderWidth: 1
            },
            areaStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: currentForecast.areaStart
                },
                {
                  offset: 1,
                  color: currentForecast.areaEnd
                }
              ])
            },
            label: {
              show: true,
              position: 'top',
              formatter: `{c}${currentForecast.unit}`,
              color: activeTab === 'rain' ? currentForecast.color : primaryColor,
              fontSize: 11,
              fontWeight: 700,
              distance: 8
            }
          }
        ],
        tooltip: {
          show: true,
          position: 'top',
          backgroundColor: cardBackground,
          borderColor: cardBorder,
          textStyle: {
            color: primaryColor
          },
          formatter: (params: TooltipParam | TooltipParam[]) => {
            const point = Array.isArray(params) ? params[0] : params

            return `${point.name}: ${point.value}${currentForecast.unit} `
          }
        }
      }, true)
    }

    setChartOptions()

    const resizeChart = () => chart.resize()
    const themeObserver = new MutationObserver(setChartOptions)

    window.addEventListener('resize', resizeChart)
    themeObserver.observe(document.documentElement, {
      attributeFilter: ['data-theme'],
      attributes: true
    })

    return () => {
      window.removeEventListener('resize', resizeChart)
      themeObserver.disconnect()
      chart.dispose()
    }
  }, [activeTab, forecastData, forecastTimes])

  if (!data.data) {
    return <p style={{ textAlign: "center" }}>Loading 24-hour forecast...</p>
  }

  return (
    <Card height="auto" width="100%" padding={12}>
      <section className={styles.container}>
        <h2>24-Hour Forecast</h2>
        <div className={styles.tabs}>
          <button
            className={activeTab === 'temperature' ? styles.activeTab : ''}
            onClick={() => setActiveTab('temperature')}
            type="button"
          >
            Temperature
          </button>
          <button
            className={activeTab === 'rain' ? styles.activeTab : ''}
            onClick={() => setActiveTab('rain')}
            type="button"
          >
            Rain
          </button>
          <button
            className={activeTab === 'wind' ? styles.activeTab : ''}
            onClick={() => setActiveTab('wind')}
            type="button"
          >
            Wind
          </button>
        </div>
        <div className={styles.chartWrapper}>
          <div className={styles.chart} ref={chartRef} />
          <div className={styles.forecastSymbols}>
            {forecastTimes.map((time, index) => {
              const weatherCode = data.data?.weatherCode[index] || 0
              const WeatherIcon =
                WEATHER_CODE_MAP[weatherCode]?.icon;
              const weatherDescription = WEATHER_CODE_MAP[weatherCode]?.label || 'Unknown weather'
              return (
                <div className={styles.forecastSymbol} aria-description={weatherDescription} key={time} title={weatherDescription}>
                  {WeatherIcon && (
                    <WeatherIcon size={20} />
                  )}
                  <span>{time}</span>
                </div>
              )
            })}

            {/* <div className={styles.forecastSymbol}>
              <Cloud size={20} />
              <span>02:00</span>
            </div>
            <div className={styles.forecastSymbol}>
              <Cloud size={20} />
              <span>04:00</span>
            </div>
            <div className={styles.forecastSymbol}>
              <CloudSun size={20} />
              <span>06:00</span>
            </div>
            <div className={styles.forecastSymbol}>
              <CloudSun size={20} />
              <span>08:00</span>
            </div>
            <div className={styles.forecastSymbol}>
              <Sun size={20} />
              <span>10:00</span>
            </div>
            <div className={styles.forecastSymbol}>
              <Sun size={20} />
              <span>12:00</span>
            </div>
            <div className={styles.forecastSymbol}>
              <Sun size={20} />
              <span>14:00</span>
            </div>
            <div className={styles.forecastSymbol}>
              <CloudSun size={20} />
              <span>16:00</span>
            </div>
            <div className={styles.forecastSymbol}>
              <CloudSun size={20} />
              <span>18:00</span>
            </div>
            <div className={styles.forecastSymbol}>
              <Cloud size={20} />
              <span>20:00</span>
            </div>
            <div className={styles.forecastSymbol}>
              <Cloud size={20} />
              <span>22:00</span>
            </div> */}
          </div>
        </div>
      </section>
    </Card>
  )
}
