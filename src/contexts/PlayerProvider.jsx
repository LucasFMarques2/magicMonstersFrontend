import { useEffect, useState } from 'react'
import api from '../services/api'
import { PlayerContext } from './PlayerContext'

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null)
  const [stats, setStats] = useState({ wins: 0, losses: 0 })

  useEffect(() => {
    const storedPlayer = localStorage.getItem('@MagicMonsters:player')
    const storedStats = localStorage.getItem('@MagicMonsters:stats')

    if (storedPlayer) {
      setPlayer(JSON.parse(storedPlayer))
    }
    if (storedStats) {
      setStats(JSON.parse(storedStats))
    }
  }, [])

  const updateStats = newStats => {
    setStats(newStats)
    localStorage.setItem('@MagicMonsters:stats', JSON.stringify(newStats))
  }

  const createPlayer = async (name, character_id) => {
    try {
      const response = await api.post('/api/player', { name, character_id })
      const createdPlayer = response.data

      const fullPlayerResponse = await api.get(
        `/api/player/${createdPlayer.id}`
      )
      const fullPlayerWithCharacter = fullPlayerResponse.data

      setPlayer(fullPlayerWithCharacter)
      localStorage.setItem(
        '@MagicMonsters:player',
        JSON.stringify(fullPlayerWithCharacter)
      )

      updateStats({ wins: 0, losses: 0 })

      return { success: true }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'Erro desconhecido ao criar jogador.'
      console.error('Erro ao criar jogador:', errorMessage)
      return { success: false, message: errorMessage }
    }
  }

  const deletePlayer = async () => {
    if (!player) return
    try {
      await api.delete(`/api/player/${player.id}`)
      setPlayer(null)
      setStats({ wins: 0, losses: 0 })
      localStorage.removeItem('@MagicMonsters:player')
      localStorage.removeItem('@MagicMonsters:stats')
    } catch (error) {
      console.error('Erro ao deletar jogador:', error.response?.data)
    }
  }

  return (
    <PlayerContext.Provider
      value={{ player, stats, createPlayer, deletePlayer, updateStats }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
