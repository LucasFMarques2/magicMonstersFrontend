import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'sonner'
import { PlayerProvider } from './contexts/PlayerProvider.jsx'
import { SocketProvider } from './contexts/SocketProvider'
import { AppRoutes } from './routes'
import { GlobalStyles } from './styles/GlobalStyles'
export function App() {
  return (
    <PlayerProvider>
      <SocketProvider>
        <Router>
          <GlobalStyles />
          <AppRoutes />
          <Toaster richColors position='top-right' closeButton />
        </Router>
      </SocketProvider>
    </PlayerProvider>
  )
}
