import styled, { css, keyframes } from 'styled-components'
import arena2Background from '../../assets/arena 02.jpg'
import arena1Background from '../../assets/arena-01.jpg'

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 1rem;
  background-image: ${props =>
    props.$arenaId === 1
      ? `url(${arena1Background})`
      : `url(${arena2Background})`};
  background-size: cover;
  background-position: center;
`

export const Arena = styled.div`
  flex-grow: 1;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 0;
  @media (max-width: 768px) {
    padding: 0.5rem 0;
    gap: 0.5rem;
  }
`

export const MonsterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 300px;
  animation: ${props =>
    props.$isHit
      ? css`
          ${shake} 0.5s
        `
      : 'none'};
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-out;
  @media (max-width: 768px) {
    width: 48%;
    gap: 0.5rem;
  }
`

export const InfoBox = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid #444;
  border-radius: 10px;
  padding: 0.75rem;
  text-align: center;
`

export const MonsterName = styled.h2`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 0.75rem;
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`

export const HealthBarOuter = styled.div`
  width: 100%;
  height: 25px;
  background-color: #333;
  border-radius: 5px;
  border: 1px solid #555;
  overflow: hidden;
  @media (max-width: 768px) {
    height: 20px;
  }
`

export const HealthBarInner = styled.div`
  height: 100%;
  width: ${props => props.$hpPercent}%;
  background-color: ${props =>
    props.$hpPercent > 50
      ? '#4caf50'
      : props.$hpPercent > 20
      ? '#ffc107'
      : '#f44336'};
  transition: width 0.5s ease-in-out;
`

export const GifDisplay = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    transform: ${props => (props.$isOpponent ? 'scaleX(-1)' : 'none')};
  }
  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
  }
`

export const ActionLog = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 0.75rem;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  text-align: center;

  color: #ffc107;
  font-size: 1.1rem;
  min-height: 40px;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 0.8rem;
    min-height: 30px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
`

export const Controls = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0.5rem;
  }
`



export const EndGameOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 2000;

  h1 {
    font-size: 5rem;
    color: ${props => (props.$isWinner ? '#50fa7b' : '#ff5555')};
    text-shadow: 0 0 15px ${props => (props.$isWinner ? '#50fa7b' : '#ff5555')};
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`

