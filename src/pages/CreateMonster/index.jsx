import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import api from '../../services/api'
import {
  BackButton,
  Container,
  ErrorMessage,
  FileInputLabel,
  Form,
  Input,
  InputGroup,
  Label,
  LeftColumn,
  MainContent,
  RightColumn,
  StatsPoints,
  SubmitButton,
  Title,
} from './styles'

const initialFiles = {
  gif_default: null,
  gif_attack: null,
  gif_defend: null,
  gif_special: null,
  gif_hit: null,
}

const initialPreviews = {
  gif_default: null,
  gif_attack: null,
  gif_defend: null,
  gif_special: null,
  gif_hit: null,
}

export const CreateMonsterPage = () => {
  const [name, setName] = useState('')
  const [stats, setStats] = useState({ attack: 5, defense: 5, speed: 5 })
  const [files, setFiles] = useState(initialFiles)
  const [previews, setPreviews] = useState(initialPreviews)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const totalPoints = useMemo(
    () => stats.attack + stats.defense + stats.speed,
    [stats]
  )
  const remainingPoints = 45 - totalPoints

  const handleStatChange = (stat, value) => {
    const numValue = Math.max(5, parseInt(value, 10) || 0)
    setStats(prev => ({ ...prev, [stat]: numValue }))
  }

  const handleFileChange = (key, event) => {
    const file = event.target.files[0]
    if (file) {
      setFiles(prev => ({ ...prev, [key]: file }))
      setPreviews(prev => ({ ...prev, [key]: URL.createObjectURL(file) }))
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (remainingPoints !== 0) {
      setError('Você deve distribuir exatamente 45 pontos de atributos.')
      return
    }
    if (!name || Object.values(files).some(f => f === null)) {
      setError('Nome e todos os 5 GIFs são obrigatórios.')
      return
    }
    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('attack', stats.attack)
    formData.append('defense', stats.defense)
    formData.append('speed', stats.speed)
    Object.entries(files).forEach(([key, file]) => {
      formData.append(key, file)
    })

    try {
      await api.post('/api/monster', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      toast.success('Novo monstro criado com sucesso!')
      navigate('/lobby')
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || 'Falha ao criar monstro.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>&#x2190;</BackButton>
      <Title>Crie seu Monstro</Title>
      <Form onSubmit={handleSubmit}>
        <MainContent>
          <LeftColumn>
            {Object.keys(previews).map(key => (
              <FileInputLabel key={key}>
                {previews[key] ? (
                  <img src={previews[key]} alt={`${key} preview`} />
                ) : (
                  <span>{key.replace('gif_', '')}</span>
                )}
                <input
                  type='file'
                  accept='image/gif'
                  onChange={e => handleFileChange(key, e)}
                />
              </FileInputLabel>
            ))}
          </LeftColumn>
          <RightColumn>
            <InputGroup>
              <Label htmlFor='name'>Nome</Label>
              <Input
                id='name'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label>Atributos</Label>
              <span>ATK: {stats.attack}</span>
              <input
                type='range'
                min='5'
                max='35'
                value={stats.attack}
                onChange={e => handleStatChange('attack', e.target.value)}
              />
              <span>DEF: {stats.defense}</span>
              <input
                type='range'
                min='5'
                max='35'
                value={stats.defense}
                onChange={e => handleStatChange('defense', e.target.value)}
              />
              <span>SPD: {stats.speed}</span>
              <input
                type='range'
                min='5'
                max='35'
                value={stats.speed}
                onChange={e => handleStatChange('speed', e.target.value)}
              />
              <StatsPoints $error={remainingPoints !== 0}>
                Pontos restantes: {remainingPoints}
              </StatsPoints>
            </InputGroup>
          </RightColumn>
        </MainContent>
        <SubmitButton type='submit' disabled={loading}>
          {loading ? 'Criando...' : 'Criar Monstro'}
        </SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  )
}
