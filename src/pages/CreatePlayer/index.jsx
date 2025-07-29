import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { usePlayer } from '../../hooks/usePlayer'
import api from '../../services/api'

import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import {
  AddCharacterButton,
  CharacterCard,
  CharacterName,
  Container,
  CreationForm,
  EmptyStateMessage,
  ErrorMessage,
  FilterInput,
  NicknameInput,
  SlideWrapper,
  SubmitButton,
  SwiperContainer,
  Title,
} from './styles'

export const CreatePlayerPage = () => {
  const [characters, setCharacters] = useState([])
  const [selectedCharacterId, setSelectedCharacterId] = useState(null)
  const [nickname, setNickname] = useState('')
  const [filter, setFilter] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [charactersLoading, setCharactersLoading] = useState(true)
  const toastShownRef = useRef(false)
  const [slidesPerView, setSlidesPerView] = useState(3)

  const { createPlayer } = usePlayer()
  const navigate = useNavigate()
  const location = useLocation()

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

  useEffect(() => {
    if (location.state?.characterCreated && !toastShownRef.current) {
      toast.success('Novo personagem criado com sucesso!')
      toastShownRef.current = true
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, navigate, location.pathname])

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setCharactersLoading(true)
        const response = await api.get('/api/character')
        setCharacters(response.data)
      } catch (err) {
        setError('Não foi possível carregar os personagens.')
        console.error(err)
      } finally {
        setCharactersLoading(false)
      }
    }
    fetchCharacters()
  }, [])

  const filteredCharacters = useMemo(
    () =>
      characters.filter(char =>
        char.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [characters, filter]
  )

  const handleSubmit = async event => {
    event.preventDefault()
    if (!selectedCharacterId || !nickname) {
      setError('Por favor, escolha um personagem e digite um nome.')
      return
    }
    setLoading(true)
    setError('')

    const result = await createPlayer(nickname, selectedCharacterId)

    if (result.success) {
      toast.success(`Jogador ${nickname} criado! Bem-vindo!`)
      navigate('/dashboard')
    } else {
      setError(result.message || 'Ocorreu um erro.')
      setLoading(false)
    }
  }

  const renderCharacterSelector = () => {
    if (charactersLoading) {
      return <EmptyStateMessage>Carregando personagens...</EmptyStateMessage>
    }

    if (filteredCharacters.length === 0) {
      return (
        <EmptyStateMessage>
          Nenhum personagem encontrado.
          <br />
          Tente criar um novo!
        </EmptyStateMessage>
      )
    }

    return (
      <SwiperContainer>
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={slidesPerView}
          navigation
        >
          {filteredCharacters.map(char => (
            <SwiperSlide key={char.id}>
              <SlideWrapper>
                <CharacterCard
                  $isSelected={selectedCharacterId === char.id}
                  onClick={() => setSelectedCharacterId(char.id)}
                >
                  <img src={char.gif_url} alt={char.name} />
                </CharacterCard>
                <CharacterName>{char.name}</CharacterName>
              </SlideWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    )
  }

  return (
    <Container>
      <AddCharacterButton onClick={() => navigate('/create-character')}>
        Criar Novo Personagem
      </AddCharacterButton>

      <Title>Crie seu Jogador</Title>

      <FilterInput
        type='text'
        placeholder='Filtrar personagem...'
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      {renderCharacterSelector()}

      <CreationForm onSubmit={handleSubmit}>
        <NicknameInput
          type='text'
          placeholder='Digite seu nome'
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <SubmitButton
          type='submit'
          disabled={!selectedCharacterId || !nickname || loading}
        >
          {loading ? 'Criando...' : 'Confirmar'}
        </SubmitButton>
      </CreationForm>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  )
}
