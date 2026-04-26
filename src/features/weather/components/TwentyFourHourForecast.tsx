import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { Cloud, CloudSun, Sun } from 'lucide-react'
import Card from '../../../shared/ui/Card'
import styles from './TwentyFourHourForecast.module.scss'

type ForecastTab = 'temperature' | 'rain' | 'wind'

type TooltipParam = {
  name: string
  value: number
}

const forecastTimes = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']

const forecastData = {
  temperature: {
    unit: '°C',
    min: 12,
    max: 23,
    color: '#e0a326',
    values: [20, 20, 20, 15, 18, 20, 21, 21, 20, 18, 16, 15],
    areaStart: 'rgba(224, 163, 38, 0.34)',
    areaEnd: 'rgba(224, 163, 38, 0.02)'
  },
  rain: {
    unit: '%',
    min: 0,
    max: 14,
    color: '#78aef7',
    values: [12, 10, 7, 4, 2, 1, 0, 0, 0, 2, 4, 6],
    areaStart: 'rgba(120, 174, 247, 0.28)',
    areaEnd: 'rgba(120, 174, 247, 0.02)'
  },
  wind: {
    unit: 'm/s',
    min: 10,
    max: 25,
    color: '#5f8cff',
    values: [18, 19, 23, 23, 21, 21, 19, 15, 14, 15, 16, 17],
    areaStart: 'rgba(95, 140, 255, 0.22)',
    areaEnd: 'rgba(95, 140, 255, 0.02)'
  }
}

export function TwentyFourHourForecast() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<ForecastTab>('temperature')

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const chart = echarts.init(chartRef.current)
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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

            return `${point.name}: ${point.value}${currentForecast.unit}`
          }
        }
      })
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
  }, [activeTab])

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
            <div className={styles.forecastSymbol}>
              <Cloud size={20} />
              <span>00:00</span>
            </div>
            <div className={styles.forecastSymbol}>
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
            </div>
          </div>
        </div>
      </section>
    </Card>
  )
}
