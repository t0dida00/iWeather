import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchLocations, type LocationSearchResult } from '../api/searchApi'
import { useNavigate } from 'react-router-dom';
import { useSearchHistory } from './useSearchHistory';

const SEARCH_DEBOUNCE_MS = 500

const sanitizeSearchValue = (value: string): string => value.replace(/[^a-zA-Z\s]/g, '')

export function useSearch() {
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')
  const navigate = useNavigate();
  const   { addToHistory } = useSearchHistory();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim())
    }, SEARCH_DEBOUNCE_MS)

    return () => window.clearTimeout(timeoutId)
  }, [searchValue])

  const query = useQuery({
    queryKey: ['locationSearch', debouncedSearchValue],
    queryFn: () => searchLocations(debouncedSearchValue),
    enabled: debouncedSearchValue.length > 1
  })

  const selectLocation = (location: LocationSearchResult) => {
    const { latitude, longitude,name, country_code, country } = location
    setSearchValue('')
    setDebouncedSearchValue('')
    addToHistory({name, country_code, country, latitude, longitude} );
    // console.log(`/overview?lat=${latitude}&lon=${longitude}&city=${name}&code=${country_code}`)
      navigate({
      pathname: '/overview',
      search: `?${new URLSearchParams({ 
        lat: String(latitude), 
        lon: String(longitude), 
        city: name, 
        code: country_code 
      })}`,
    });
  }

  return {
    ...query,
    searchValue,
    debouncedSearchValue,
    selectLocation,
    setSearchValue: (value: string) => setSearchValue(sanitizeSearchValue(value))
  }
}
