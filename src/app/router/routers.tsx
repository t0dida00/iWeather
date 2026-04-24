import { Navigate, createBrowserRouter } from 'react-router-dom'
import { WeatherOverview } from '../../features/weather'
import { NotFound } from '../../pages/NotFound'
import { RootLayout } from '../layouts/RootLayout'

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/overview" replace />,
      },
      {
        path: 'overview',
        element: <WeatherOverview />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
