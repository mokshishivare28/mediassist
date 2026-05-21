import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import MentalWellness from "./Components/MentalWellness/MentalWellness";
import MedicalConsultation from "./Components/SymptomAnalysis/MedicalConsultation";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import "./index.css";

function App() {
  const [active, setActive] = useState(1);
  const [loadingApp, setLoadingApp] = useState(true);
  const [fil, setFil] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const updateActive = (activeState) => {
    setActive(activeState);
    setMobileMenuOpen(false); // Close menu after selection
  };

  const updateFilter = (fils) => {};

  const displayData = () => {
    switch (active) {
      case 1:
        return <Home updateActive={updateActive} />;
      case 2:
        // return <SymptomAnalysis updateActive={updateActive} />;
        return <MedicalConsultation updateActive={updateActive} />;
      case 3:
        return <MentalWellness updateActive={updateActive} />;
      default:
        return <Home />;
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setLoadingApp(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      {loadingApp ? (
        <LoadingScreen />
      ) : (
        <MainLayout>
          <Navigation 
            active={active} 
            setActive={updateActive} 
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          <main>{displayData()}</main>
        </MainLayout>
      )}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  
  @media (max-width: 768px) {
    height: 100vh;
    main {
      border-radius: 16px;
      border-width: 2px;
    }
  }
  
  @media (max-width: 480px) {
    height: 100vh;
    main {
      border-radius: 8px;
      border-width: 1px;
    }
  }
`;

export default App;
