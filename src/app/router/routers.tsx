import { Navigate, createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { NotFound } from '../../pages/NotFound'
import { RootLayout } from '../layouts/RootLayout'
// import { DashboardPage } from '../../pages/DashboardPage'
import { CitiesPage } from '../../pages/CitiesPage'

const DashboardPage = lazy(() => import('../../pages/DashboardPage').then(module => ({ default: module.DashboardPage })))
// const CitiesPage = lazy(() => import('../../pages/CitiesPage').then(module => ({ default: module.CitiesPage })))

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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardPage />
          </Suspense>
        ),

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
