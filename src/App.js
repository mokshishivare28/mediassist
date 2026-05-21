import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import MentalWellness from "./Components/MentalWellness/MentalWellness";
import MedicalConsultation from "./Components/SymptomAnalysis/MedicalConsultation";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import AuthPage from "./Components/Auth/AuthPage";
import { supabase, isSupabaseConfigValid } from "./supabase";
import "./index.css";

function App() {
  const [active, setActive] = useState(1);
  const [loadingApp, setLoadingApp] = useState(true);
  const [fil, setFil] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
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
    let subscription = null;

    if (isSupabaseConfigValid) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user || null);
      });

      const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user || null);
        }
      );
      subscription = authSubscription;
    }

    const t = setTimeout(() => setLoadingApp(false), 4000);
    return () => {
      clearTimeout(t);
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      setActive(1);
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  return (
    <AppStyled bg={bg} className="App">
      {loadingApp ? (
        <LoadingScreen />
      ) : !isSupabaseConfigValid ? (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '32px', textAlign: 'center' }}>
          <div style={{ maxWidth: 520, background: 'rgba(255,255,255,0.95)', borderRadius: 28, border: '1px solid #ddd', padding: 36, boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
            <h1 style={{ fontSize: 32, marginBottom: 16, color: '#3f2d7d' }}>Supabase configuration missing</h1>
            <p style={{ fontSize: 16, color: '#4b4b4b', lineHeight: 1.6 }}>
              Your app needs Supabase config values set in a <code>.env</code> file at the project root. Create a file named <code>.env</code> and add the keys shown in <code>.env.example</code>.
            </p>
            <p style={{ marginTop: 24, color: '#2f1b6f', fontWeight: 600 }}>
              After adding the values, restart the development server.
            </p>
          </div>
        </div>
      ) : !user ? (
        <AuthPage onAuthSuccess={setUser} />
      ) : (
        <MainLayout>
          <Navigation 
            active={active} 
            setActive={updateActive} 
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            onSignOut={handleSignOut}
            user={user}
          />
          <main>{displayData()}</main>
        </MainLayout>
      )}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  min-height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  
  @media (max-width: 768px) {
    main {
      border-radius: 16px;
      border-width: 2px;
    }
  }
  
  @media (max-width: 480px) {
    main {
      border-radius: 8px;
      border-width: 1px;
    }
  }
`;

export default App;
