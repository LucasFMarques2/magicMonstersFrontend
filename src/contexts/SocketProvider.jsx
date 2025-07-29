import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { usePlayer } from '../hooks/usePlayer'
import { SocketContext } from './SocketContext'

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const { player } = usePlayer()

  useEffect(() => {
    if (player) {
      const newSocket = io(import.meta.env.VITE_API_URL)
      setSocket(newSocket)

      return () => newSocket.close()
    }
  }, [player])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
