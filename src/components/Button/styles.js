import styled, { css } from 'styled-components'

const variants = {
  primary: css`
    background-color: #860dd6ff;
    color: #ffffff;
  `,
  confirm: css`
    background-color: #1c7c3c;
    color: #ffffff;
  `,
  danger: css`
    background-color: transparent;
    color: #ff5555;
    border: 2px solid #ff5555;
    &:hover:not(:disabled) {
      background-color: #ff5555;
      color: white;
    }
  `,
  neutral: css`
    background-color: #444;
    color: #ffffff;
    border: 2px solid #666;
    &:hover:not(:disabled) {
      background-color: #61dafb;
      color: black;
    }
  `,
  light: css`
    background-color: #61dafb;
    color: #282c34;
    border: none;
  `,
}

export const StyledButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;

  ${({ $variant }) => variants[$variant] || variants.primary}

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #555;
    color: #888;
    cursor: not-allowed;
    border-color: #555;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
    padding: 0.8rem 1rem;
  }
`
