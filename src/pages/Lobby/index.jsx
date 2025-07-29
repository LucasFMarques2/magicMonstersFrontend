import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { usePlayer } from '../../hooks/usePlayer'
import { useSocket } from '../../hooks/useSocket'
import api from '../../services/api'

import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import {
  CancelButton,
  Container,
  FindMatchButton,
  MonsterCard,
  MonsterName,
  NavButton,
  SearchingOverlay,
  Stat,
  Stats,
  SwiperContainer,
  Title,
  TopButtonsContainer,
} from './styles'

export const LobbyPage = () => {
  const [monsters, setMonsters] = useState([])
  const [selectedMonsterId, setSelectedMonsterId] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [slidesPerView, setSlidesPerView] = useState(3)

  const { player } = usePlayer()
  const socket = useSocket()
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('/api/monster')
      .then(response => setMonsters(response.data))
      .catch(err => console.error('Falha ao buscar monstros', err))
  }, [])

  useEffect(() => {
    if (!socket) return

    const handleMatchFound = data => {
      toast.success(data.message)
      setIsSearching(false)
      navigate(`/battle/${data.battle.id}`, {
        state: { battleData: data.battle },
      })
    }
    const handleMatchmakingStatus = data => toast.info(data.message)
    const handleMatchmakingError = data => {
      toast.error(data.message)
      setIsSearching(false)
    }

    socket.on('match_found', handleMatchFound)
    socket.on('matchmaking_status', handleMatchmakingStatus)
    socket.on('matchmaking_error', handleMatchmakingError)

    return () => {
      socket.off('match_found', handleMatchFound)
      socket.off('matchmaking_status', handleMatchmakingStatus)
      socket.off('matchmaking_error', handleMatchmakingError)
    }
  }, [socket, navigate])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesPerView(1)
      } else {
        setSlidesPerView(3)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleFindMatch = () => {
    if (!selectedMonsterId || !player) return
    setIsSearching(true)
    socket.emit('find_match', {
      playerId: player.id,
      monsterId: selectedMonsterId,
    })
  }

  const handleCancelSearch = () => {
    setIsSearching(false)
    socket.emit('cancel_matchmaking')
  }

  return (
    <>
      {isSearching && (
        <SearchingOverlay>
          <div className='spinner'></div>
          <p>Procurando oponente...</p>
          <CancelButton onClick={handleCancelSearch}>Cancelar</CancelButton>
        </SearchingOverlay>
      )}

      <Container>
        <TopButtonsContainer>
          <NavButton onClick={() => navigate('/dashboard')}>
            Voltar ao Dashboard
          </NavButton>
          <NavButton
            style={{ backgroundColor: '#1c7c3c' }}
            onClick={() => navigate('/create-monster')}
          >
            Criar Novo Monstro
          </NavButton>
        </TopButtonsContainer>

        <Title>Escolha seu Monstro</Title>

        <SwiperContainer>
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={slidesPerView}
            navigation
          >
            {monsters.map(monster => (
              <SwiperSlide key={monster.id}>
                <MonsterCard
                  $isSelected={selectedMonsterId === monster.id}
                  onClick={() => setSelectedMonsterId(monster.id)}
                >
                  <img src={monster.gif_default} alt={monster.name} />
                  <MonsterName>{monster.name}</MonsterName>
                  <Stats>
                    <Stat>ATK: {monster.attack}</Stat>
                    <Stat>DEF: {monster.defense}</Stat>
                    <Stat>SPD: {monster.speed}</Stat>
                  </Stats>
                </MonsterCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>

        <FindMatchButton
          disabled={!selectedMonsterId}
          onClick={handleFindMatch}
        >
          Procurar Partida
        </FindMatchButton>
      </Container>
    </>
  )
}
