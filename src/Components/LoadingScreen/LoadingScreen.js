import React from 'react'
import styled, { keyframes } from 'styled-components'
import bg from '../../img/bg.png'
import avatar from '../../img/avatar.png'

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.18); }
  100% { transform: scale(1); }
`;

const fadeInSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoadingScreen = () => {
  return (
    <Wrap bg={bg}>
      <Container>
        <Avatar src={avatar} alt="avatar" />
        <Title>Medi Assist</Title>
      </Container>
    </Wrap>
  )
}

const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(p) => p.bg});
  background-size: cover;
  background-position: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 999px;
  object-fit: cover;
  animation: ${pulse} 6s ease-in-out infinite;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(90deg, #7b2ff7, #f107a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  animation: ${fadeInSlideUp} 3s ease-out forwards;
  margin: 0;
  letter-spacing: 2px;
`;

export default LoadingScreen
