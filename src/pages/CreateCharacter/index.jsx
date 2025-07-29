import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import {
  BackButton,
  Container,
  ErrorMessage,
  Form,
  ImagePreview,
  Input,
  InputGroup,
  Label,
  SubmitButton,
  Title,
} from './styles'

export const CreateCharacterPage = () => {
  const [name, setName] = useState('')
  const [gifFile, setGifFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      setGifFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    } else {
      setGifFile(null)
      setPreviewUrl(null)
    }
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleSubmit = async event => {
    event.preventDefault()
    if (!name || !gifFile) {
      setError('Nome e arquivo GIF são obrigatórios.')
      return
    }
    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('gif', gifFile)

    try {
      await api.post('/api/character', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      navigate('/create-player', { state: { characterCreated: true } })
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || 'Falha ao criar personagem.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>&#x2190;</BackButton>

      <Form onSubmit={handleSubmit}>
        <Title>Novo Personagem</Title>

        <ImagePreview>
          {previewUrl ? (
            <img src={previewUrl} alt='Prévia do personagem' />
          ) : (
            'Prévia do GIF'
          )}
        </ImagePreview>

        <InputGroup>
          <Label htmlFor='gif'>GIF do Personagem</Label>
          <Input
            id='gif'
            type='file'
            accept='image/gif'
            onChange={handleFileChange}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor='name'>Nome do Personagem</Label>
          <Input
            id='name'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </InputGroup>

        <SubmitButton type='submit' disabled={loading}>
          {loading ? 'Criando...' : 'Criar'}
        </SubmitButton>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  )
}
