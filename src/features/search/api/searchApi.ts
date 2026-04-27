import axios from 'axios'

export type LocationSearchResult = {
  id: number
  name: string
  country: string
  admin1?: string
  latitude: number
  longitude: number
  country_code: string
}

type LocationSearchResponse = {
  results?: LocationSearchResult[]
}

const geocodingUrl = import.meta.env.VITE_OPEN_METEO_GEOCODING_URL

export async function searchLocations(name: string): Promise<LocationSearchResult[]> {
  if (!geocodingUrl) {
    throw new Error('Missing VITE_OPEN_METEO_GEOCODING_URL')
  }

  const { data } = await axios.get<LocationSearchResponse>(geocodingUrl, {
    params: {
      name,
      count: 5,
      language: 'en',
      format: 'json'
    }
  })

  return data.results || []
}
