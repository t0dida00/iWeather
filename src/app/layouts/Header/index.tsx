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
          <p>Hi, Corsearch!</p>
        </div>
      </div>
    </header>
  )
}
