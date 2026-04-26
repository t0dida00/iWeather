import { Navigate, createBrowserRouter } from 'react-router-dom'
import { NotFound } from '../../pages/NotFound'
import { RootLayout } from '../layouts/RootLayout'
import { DashboardPage } from '../../pages/DashboardPage'
import { CitiesPage } from '../../pages/CitiesPage'

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/cities" replace />,
      },
      {
        path: 'overview',
        element: <DashboardPage />,
      },
      {
        path: 'cities',
        element: <CitiesPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
