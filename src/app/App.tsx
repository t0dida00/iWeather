import { RouterProvider } from 'react-router-dom'
import { AppProviders } from './providers'
import { routers } from './router/routers'

function App() {
  return (
    <AppProviders>
      <RouterProvider router={routers} />
    </AppProviders>
  )
}

export default App
