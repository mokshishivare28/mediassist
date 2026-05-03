import React, { useState } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import SymptomAnalysis from '../SymptomAnalysis/SymptomAnalysis';
import MentalWellness from '../MentalWellness/MentalWellness';
import hero from '../../img/hero.png'

function Home({ updateActive }) {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [message, setMessage] = useState("");

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "SymptomAnalysis":
        updateActive(2);
        return null;
      case "MentalWellness":
        updateActive(3);
        return null;
      default:
        updateActive(1);
        return null;
    }
  };

  return (
    <HomeStyled>
      {!selectedComponent ? (
        <>
          <HeroSection>
            <div className='hero'>
              <div className='des'>
                <h1>Medi Assist:</h1>
                <h2>Take Charge of Your Health, Mind & Body</h2>
                <p>
                  Feeling under the weather and not sure what's wrong? 
                  Don't worry, MediAssist is here to be your friendly health detective!
                </p>
              </div>
              <div className='des'>
                <img src={hero} alt='' />
              </div>
            </div>
          </HeroSection>

          <CardContainer>
            <Card onClick={() => handleComponentClick('SymptomAnalysis')}>
              <h2>Symptom Analysis</h2>
              <p>Analyze your symptoms and get assistance powered by AI</p>
            </Card>

            <Card onClick={() => handleComponentClick('MentalWellness')}>
              <h2>Mind-Bot</h2>
              <p>Your AI Companion for Mental Wellness and guidance</p>
            </Card>

            <Card 
              onClick={() => {
                setMessage('Feature Coming Soon, Have Patience 😒');
                setTimeout(() => setMessage(""), 3000);
              }}
            >
              <h2>Consult Doctor</h2>
              <h4>(Coming Soon)</h4>
              <p>Explore specialists and book appointments hassle-free</p>
            </Card>
          </CardContainer>

          {message && <MessageBox>{message}</MessageBox>}
        </>
      ) : (
        renderSelectedComponent()
      )}
    </HomeStyled>
  );
}

/* 🔥 BACKGROUND */
const HomeStyled = styled.div`
`;

/* 🔥 HERO */
const HeroSection = styled.div`
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .hero{
    height: 300px;
    margin: 50px 80px;
    display: flex;
    justify-content: space-between;
  }

  .des{
    flex: 1;
    margin-right: 20px;
    margin-top: 40px;
  }

  .des h3{
    font-size: 28px;
    font-weight:700;
    color: #6a0dad;
  }

  /* 🔥 GRADIENT TEXT */
  .des h1{
    font-weight: 800;
    font-size: 42px;
    background: linear-gradient(90deg, #7b2ff7, #f107a3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .des p{
    color: #333;
    font-weight: 500;
  }
  .des h2{
    font-weight: 800;
    font-size: 32px;
    background: linear-gradient(90deg, #cc99ff, #993366);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .des img{
    width: 320px;
    margin-left: 100px;
    margin-top: -30px;
  }
`;

/* 🔥 BETTER SPACING */
const CardContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  margin: 100px 50px;
`;

/* 🔥 GLASS EFFECT CARDS */
const Card = styled.div`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  padding: 25px;
  border-radius: 16px;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  width: calc(33.33% - 20px);

  transition: all 0.3s ease;
  color: #4b0082;

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 15px 40px rgba(123, 97, 255, 0.4);
    cursor: pointer;
  }

  h2 {
    font-weight: 700;
    margin-bottom: 10px;
  }

  h4 {
    margin-bottom: 10px;
    color: #7a4cff;
  }

  p {
    font-size: 16px;
    color: #444;
  }
`;

/* 🔥 TOAST */
const MessageBox = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  
  font-weight: bold;
  color: white;
  background: crimson;
  padding: 12px 20px;
  border-radius: 8px;
  z-index: 1000;

  box-shadow: 0 4px 12px rgba(0,0,0,0.2);

  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

export default Home;