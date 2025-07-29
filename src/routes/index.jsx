import { Navigate, Route, Routes } from 'react-router-dom'
import { usePlayer } from '../hooks/usePlayer'

import { BattlePage } from '../pages/Battle'
import { CreateCharacterPage } from '../pages/CreateCharacter'
import { CreateMonsterPage } from '../pages/CreateMonster'
import { CreatePlayerPage } from '../pages/CreatePlayer'
import { DashboardPage } from '../pages/Dashboard'
import { HomePage } from '../pages/Home'
import { LobbyPage } from '../pages/Lobby'

const PrivateRoute = ({ children }) => {
  const { player } = usePlayer()
  return player ? children : <Navigate to='/create-player' />
}

export const AppRoutes = () => {
  const { player } = usePlayer()

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route
        path='/create-player'
        element={player ? <Navigate to='/dashboard' /> : <CreatePlayerPage />}
      />

      <Route
        path='/lobby'
        element={
          <PrivateRoute>
            <LobbyPage />
          </PrivateRoute>
        }
      />
      <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path='/battle/:id'
        element={
          <PrivateRoute>
            <BattlePage />
          </PrivateRoute>
        }
      />
      <Route
        path='/create-monster'
        element={
          <PrivateRoute>
            <CreateMonsterPage />
          </PrivateRoute>
        }
      />
      <Route path='/create-character' element={<CreateCharacterPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}
