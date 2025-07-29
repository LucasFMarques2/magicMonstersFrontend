import styled from 'styled-components'

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive;
  background-color: #20232a;
  border: 2px solid #444;
  border-radius: 5px;
  color: white;
  text-align: center;
  outline: none;

  &::placeholder {
    color: #888;
    font-family: 'Press Start 2P', cursive;
  }

  &:focus {
    border-color: #61dafb;
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`
