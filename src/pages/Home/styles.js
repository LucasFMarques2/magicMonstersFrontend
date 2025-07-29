import styled from 'styled-components'
import backgroundHome from '../../assets/backgroundHome.png'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-image: url(${backgroundHome});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

export const Title = styled.h1`
  font-size: 5rem;
  color: #92ca10ff;
  margin-bottom: 20rem;
  background-color: #585196ff;
  padding: 2rem;
  border-radius: 8px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 15rem;
    padding: 1.5rem;
    max-width: 95%;
  }
`

export const PlayButton = styled.button`
  padding: 1rem 3rem;
  font-size: 2rem;
  color: #ffffffff;
  background-color: #860dd6ff;

  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 1rem 2rem;
  }
`
