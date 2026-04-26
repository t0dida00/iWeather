import { Navigate, createBrowserRouter } from 'react-router-dom'
import { NotFound } from '../../pages/NotFound'
import { RootLayout } from '../layouts/RootLayout'
import { DashboardPage } from '../../pages/DashboardPage'

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
        element: <DashboardPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
