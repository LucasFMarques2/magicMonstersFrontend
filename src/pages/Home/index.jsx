import { useNavigate } from 'react-router-dom'
import { Container, PlayButton, Title } from './styles'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Title>Magic Monsters</Title>
      <PlayButton onClick={() => navigate('/create-player')}>Jogar</PlayButton>
    </Container>
  )
}
