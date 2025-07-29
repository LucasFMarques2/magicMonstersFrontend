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
  overflow-x: hidden;
  background-image: url(${backgroundCharacter});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

export const AddCharacterButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.7rem 1rem;
  font-size: 0.7rem;

  color: #ffffff;
  background-color: #1c7c3c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
`

export const FilterInput = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  background-color: #20232a;
  border: 2px solid #444;
  border-radius: 5px;
  color: white;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #61dafb;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.7rem;
    margin-bottom: 1rem;
  }
`

export const SwiperContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 1.5rem;
  position: relative;
  padding: 0 10px;

  .swiper-button-prev,
  .swiper-button-next {
    color: #7c64e4ff;
    top: 50%;
    transform: translateY(-50%);
  }

  .swiper-button-prev {
    left: -2px;
  }

  .swiper-button-next {
    right: -2px;
  }

  @media (max-width: 768px) {
    max-width: 200px;
    margin-bottom: 1rem;
  }
`

export const SlideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
`

export const CharacterCard = styled.div`
  border: 4px solid ${props => (props.$isSelected ? '#61dafb' : '#444')};
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem;

  &:hover {
    transform: scale(0.9);
    border-color: #61dafb;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
  }
`

export const CharacterName = styled.p`
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  background-color: #000;
  padding: 0.5rem;
  border-radius: 5px;
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`

export const CreationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`

export const ErrorMessage = styled.p`
  color: #ff5555;
  margin-top: 1rem;
  font-weight: bold;
`

export const EmptyStateMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 800px;
  height: 280px;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px dashed #444;
  border-radius: 10px;
  color: #ccc;

  font-size: 1rem;
  line-height: 1.5;
`
