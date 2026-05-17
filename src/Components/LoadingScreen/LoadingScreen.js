import React from 'react'
import styled, { keyframes } from 'styled-components'
import bg from '../../img/bg.png'
import avatar from '../../img/avatar.png'

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.18); }
  100% { transform: scale(1); }
`;

const LoadingScreen = () => {
  return (
    <Wrap bg={bg}>
      <Avatar src={avatar} alt="avatar" />
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

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 999px;
  object-fit: cover;
  animation: ${pulse} 2s ease-in-out infinite;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
`;

export default LoadingScreen
