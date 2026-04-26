import TemperatureToggle from '../../../features/preferences/components/TemperatureToggle'
import ThemeToggle from '../../../features/preferences/components/ThemeToggle'
import { LocationSearch } from '../../../features/search'
import styles from './style.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerWrapper}>
        <div className={styles.greeting}>
          <p>Hi, Corsearch</p>
          <p>Good Morning</p>
        </div>
        <LocationSearch />
        <div className={styles.toggleButtons}>
          <ThemeToggle />
          <TemperatureToggle />
        </div>
      </div>
    </header>
  )
}
