import { useNavigate } from 'react-router-dom'
import { Container, Title } from './styles'
import { Button } from '../../components/Button'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Title>Magic Monsters</Title>
      <Button onClick={() => navigate('/create-player')}>Jogar</Button>
    </Container>
  )
}
