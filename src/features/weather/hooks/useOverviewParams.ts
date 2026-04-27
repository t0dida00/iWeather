// hooks/useOverviewParams.ts
import { useSearchParams } from 'react-router-dom';

export const useOverviewParams = () => {
  const [searchParams] = useSearchParams();

  return {
    lat: Number(searchParams.get('lat')),
    lon: Number(searchParams.get('lon')),
    city: searchParams.get('city'),
    code: searchParams.get('code'),
  };
};
