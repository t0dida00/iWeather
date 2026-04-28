import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import TemperatureToggle from '../../../features/preferences/components/TemperatureToggle'
import ThemeToggle from '../../../features/preferences/components/ThemeToggle'
import { LocationSearch } from '../../../features/search'
import { formatLatestUpdateTime, getLatestTimestamp } from '../../../shared/utils/common'
import styles from './style.module.scss'

export function Header() {
  const queryClient = useQueryClient()
  useIsFetching({ queryKey: ['weatherData'] })

  const weatherQueries = queryClient.getQueryCache().findAll({ queryKey: ['weatherData'] })
  const latestWeatherUpdate = getLatestTimestamp(weatherQueries.map((query) => query.state.dataUpdatedAt))
  const latestUpdateTime = formatLatestUpdateTime(latestWeatherUpdate)

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerWrapper}>
        <div className={styles.greeting}>
          <p>Hi, Corsearch</p>
          <p>Good Morning</p>
          <p className={styles.updatedTime}>Latest update: {latestUpdateTime}</p>
        </div>
        <div className={styles.searchBar}>
          <LocationSearch />
        </div>

        <div className={styles.toggleButtons}>
          <ThemeToggle />
          <TemperatureToggle />
        </div>





      </div>
    </header>
  )
}
