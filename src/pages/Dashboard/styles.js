import styled from 'styled-components'
import backgroundDashboard from '../../assets/backgroundDashboard.gif'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-image: url(${backgroundDashboard});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: flex-start;
  }
`

export const Header = styled.header`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`

export const WelcomeMessage = styled.h1`
  font-size: 2.5rem;
  span {
    color: #61dafb;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const DeleteButton = styled.button`
  padding: 0.7rem 1rem;
  font-size: 0.8rem;

  color: #ff5555;
  background-color: transparent;
  border: 2px solid #ff5555;
  border-radius: 8px;
  transition: all 0.2s;
  &:hover {
    background-color: #ff5555;
    color: white;
  }
`

export const PlayerCharacterCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  border-radius: 15px;
  border: 2px solid #444;
  margin-bottom: 2rem;

  img {
    width: 200px;
    height: 200px;
    object-fit: contain;
    @media (max-width: 768px) {
      width: 120px;
      height: 120px;
    }
  }
`

export const CharacterName = styled.h2`
  font-size: 1.2rem;
  color: #ccc;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 900px;
  margin-bottom: 3rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
`

export const StatCard = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  border: 2px solid #444;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0.8rem 0.5rem;
  }
`

export const StatValue = styled.p`
  font-size: 2.8rem;
  color: #61dafb;
  margin-bottom: 0.5rem;
  word-break: break-all;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export const StatLabel = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`

export const PlayButton = styled.button`
  padding: 1.5rem 4rem;
  font-size: 2.5rem;

  color: #ffffffff;
  background-color: #1c7c3c;
  border: none;
  border-radius: 15px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.5rem;
    padding: 1rem;
  }
`
