import { useNavigate } from 'react-router-dom'
import { usePlayer } from '../../hooks/usePlayer'
import {
  CharacterName,
  Container,
  DeleteButton,
  Header,
  PlayButton,
  PlayerCharacterCard,
  StatCard,
  StatLabel,
  StatsContainer,
  StatValue,
  WelcomeMessage,
} from './styles'

export const DashboardPage = () => {
  const { player, stats, deletePlayer } = usePlayer()
  const navigate = useNavigate()

  const winRate =
    (stats.wins || 0) + (stats.losses || 0) > 0
      ? (
          (stats.wins / ((stats.wins || 0) + (stats.losses || 0))) *
          100
        ).toFixed(0) + '%'
      : '0%'

  const handleDelete = () => {
    if (
      window.confirm(
        'Tem certeza que deseja deletar seu jogador? Esta ação não pode ser desfeita.'
      )
    ) {
      deletePlayer()
    }
  }

  if (!player) {
    return <div>Carregando...</div>
  }

  return (
    <Container>
      <Header>
        <WelcomeMessage>
          Bem-vindo, <span>{player.name}</span>!
        </WelcomeMessage>
        <DeleteButton onClick={handleDelete}>Deletar Jogador</DeleteButton>
      </Header>

      <PlayerCharacterCard>
        <img src={player.character_gif_url} alt={player.character_name} />
        <CharacterName>{player.character_name}</CharacterName>
      </PlayerCharacterCard>

      <StatsContainer>
        <StatCard>
          <StatValue>{stats.wins}</StatValue>
          <StatLabel>Vitórias</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.losses}</StatValue>
          <StatLabel>Derrotas</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{winRate}</StatValue>
          <StatLabel>Taxa de Vitória</StatLabel>
        </StatCard>
      </StatsContainer>

      <PlayButton onClick={() => navigate('/lobby')}>Jogar</PlayButton>
    </Container>
  )
}
