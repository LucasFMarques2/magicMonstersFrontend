import styled, { keyframes } from 'styled-components'
import backgroundDashboard from '../../assets/backgroundDashboard.gif'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background-image: url(${backgroundDashboard});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: center;
  }
`

export const TopButtonsContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    position: static;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-bottom: 1.5rem;
  }
`

export const NavButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 0.8rem;

  color: #ffffff;
  background-color: #444;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(0.9);
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.8rem;
    font-size: 0.8rem;
  }
`

export const Title = styled.h1`
  font-size: 3rem;
  margin-top: 5rem;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
`

export const SwiperContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin-bottom: 2rem;
  position: relative;
  padding: 0 50px;

  .swiper-button-prev,
  .swiper-button-next {
    color: #61dafb;
  }

  @media (max-width: 768px) {
    padding: 0 10px;
    max-width: 280px;
  }
`

export const MonsterCard = styled.div`
  border: 4px solid ${props => (props.$isSelected ? '#61dafb' : '#444')};
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: scale(0.9);
    border-color: #61dafb;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: contain;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.2);
    @media (max-width: 768px) {
      height: 150px;
    }
  }
`

export const MonsterName = styled.h2`
  font-size: 1.2rem;
  padding: 0.75rem;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export const Stats = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
`

export const Stat = styled.span`
  color: #ccc;
`

export const FindMatchButton = styled.button`
  padding: 1.5rem 4rem;
  font-size: 2rem;

  color: #ffffffff;
  background-color: #1c7c3c;
  border: none;
  border-radius: 15px;
  transition: all 0.2s;

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 1rem;
    width: 100%;
    max-width: 280px;
  }
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const SearchingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 1000;

  p {
    font-size: 2rem;
    color: white;
    @media (max-width: 768px) {
      font-size: 1.5rem;
      text-align: center;
    }
  }

  .spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #61dafb;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: ${spin} 1s linear infinite;
  }
`

export const CancelButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;

  color: #ff5555;
  background-color: transparent;
  border: 2px solid #ff5555;
  border-radius: 8px;
  &:hover {
    background-color: #ff5555;
    color: white;
  }
`
