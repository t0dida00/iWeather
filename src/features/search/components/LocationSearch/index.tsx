import styles from './style.module.scss'

export function LocationSearch() {
  return (
    <form className={styles.searchBar} role="search">
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="m21 21-4.3-4.3m1.3-5.2a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
      </svg>
      <input type="search" placeholder="Search your location" aria-label="Search your location" />
    </form>
  )
}
