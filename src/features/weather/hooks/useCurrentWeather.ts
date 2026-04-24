import { useQuery } from '@tanstack/react-query'
import { getCurrentWeather } from '../api/weatherApi'

export function useCurrentWeather() {
  return useQuery({
    queryKey: ['current-weather'],
    queryFn: getCurrentWeather,
  })
}
