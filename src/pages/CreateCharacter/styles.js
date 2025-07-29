import styled from 'styled-components'
import backgroundCharacter from '../../assets/background.gif'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  position: relative;
  background-image: url(${backgroundCharacter});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

export const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  color: #7c64e4ff;
  font-size: 2.3rem;
  cursor: pointer;
  line-height: 1;
  background-color: #14161aff;
  padding: 1rem;
  border-radius: 5px;
  transition: all.2s;

  &:hover {
    transform: scale(0.9);
  }
`

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-top: 5rem;
    margin-bottom: 1rem;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 5rem;
  border-radius: 15px;
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`

export const ImagePreview = styled.div`
  width: 150px;
  height: 150px;
  border: 3px dashed #444;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  color: #888;
  font-size: 0.9rem;

  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
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
  &[type='file'] {
     font-family: sans-serif;
  }
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
