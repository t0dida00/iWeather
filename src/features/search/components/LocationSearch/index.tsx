import { useSearch } from '../../hooks/useSearch'
import styles from './style.module.scss'

export function LocationSearch() {
  const { data: locations = [], debouncedSearchValue, isFetching, searchValue, selectLocation, setSearchValue } = useSearch()

  return (
    <form className={styles.searchBar} role="search" onSubmit={(event) => event.preventDefault()}>
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="m21 21-4.3-4.3m1.3-5.2a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
      </svg>
      <input
        type="search"
        placeholder="Search your location"
        aria-label="Search your location"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      {debouncedSearchValue.length > 1 && (
        <div className={styles.results} role="listbox">
          {isFetching ? (
            <p>Searching...</p>
          ) : locations.length > 0 ? (
            locations.map((location) => (
              <button className={styles.result} key={location.id} onClick={() => selectLocation(location)} type="button">
                <span>{location.name}</span>
                <small>{[location.admin1, location.country].filter(Boolean).join(', ')}</small>
              </button>
            ))
          ) : (
            <p>No location found</p>
          )}
        </div>
      )}
    </form>
  )
}
