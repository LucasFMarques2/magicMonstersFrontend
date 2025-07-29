import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  position: relative;
`

export const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: none;
  border: none;
  color: #61dafb;
  font-size: 2.5rem;
  cursor: pointer;
  line-height: 1;
`

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 2.5rem;
  border-radius: 15px;
`

export const MainContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  width: 100%;
  justify-content: center;
`

export const LeftColumn = styled.div`
  flex: 1;
  min-width: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

export const RightColumn = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const FileInputLabel = styled.label`
  width: 100%;
  height: 120px;
  border: 3px dashed #444;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  color: #888;
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #61dafb;
  }

  img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 5px;
  }

  input[type='file'] {
    display: none;
  }
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`

export const Label = styled.label`
  font-size: 1rem;
`

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #20232a;
  border: 2px solid #444;
  border-radius: 5px;
  color: white;
  &:focus {
    outline: none;
    border-color: #61dafb;
  }
`

export const StatsPoints = styled.p`
  color: ${props => (props.$error ? '#ff5555' : '#61dafb')};
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`

export const SubmitButton = styled.button`
  padding: 1rem 2rem;
  margin-top: 1rem;
  font-size: 1.5rem;

  color: #ffffffff;
  background-color: #860dd6ff;
  border: none;
  border-radius: 10px;
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.p`
  color: #ff5555;
  margin-top: 1rem;
  font-weight: bold;
  text-align: center;
`
