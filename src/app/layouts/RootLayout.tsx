import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import styles from './RootLayout.module.scss'
export function RootLayout() {
  return (
    <main className={styles.appContainer}>
      <Header />
      <Outlet />
    </main>
  )
}
