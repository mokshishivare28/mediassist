import React, { useState } from 'react';
import styled from 'styled-components';
import bg from '../../img/bg.png';
import { supabase } from '../../supabase';

function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const clearStatus = () => {
    setError('');
    setMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearStatus();
    setLoading(true);

    try {
      let response;

      if (mode === 'signup') {
        if (!email || !password || !confirmPassword || !fullName) {
          throw new Error('Please complete all signup fields.🥱');
        }
        if (!fullName.trim()) {
          throw new Error('Please enter your full name.');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match.😒');
        }
        // include full name as user metadata (Supabase accepts metadata in the signUp options)
        response = await supabase.auth.signUp(
          { email, password },
          { data: { full_name: fullName } }
        );

        // Handle Supabase signup errors, and specifically catch already-registered emails
        if (response.error) {
          const msg = response.error.message || '';
          if (/already registered|already exists|duplicate|user exists|account already exists/i.test(msg)) {
            throw new Error('User already exists. Please login instead.');
          }
          throw response.error;
        }

        setMessage('Signup successful! Please verify your email and then login.😍');
        setMode('login');
        setPassword('');
        setConfirmPassword('');
        setFullName('');
        try {
          localStorage.setItem('user_full_name', fullName);
        } catch (e) {
          // ignore storage errors
        }
      } else {
        if (!email || !password) {
          throw new Error('Please enter your email and password.🥱');
        }
        response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (response.error) throw response.error;
        setMessage('Login successful! Redirecting...');
        // persist user's full name locally if available from user metadata
        const userMeta = response.data?.user?.user_metadata || response.data?.user?.user_metadata || {};
        const nameFromMeta = userMeta?.full_name || userMeta?.fullName || '';
        if (nameFromMeta) {
          try { localStorage.setItem('user_full_name', nameFromMeta); } catch (e) {}
        }
        if (response.data?.user) {
          onAuthSuccess(response.data.user);
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Remember correct password! 😞');
    } finally {
      setLoading(false);
    }
  };


  return (
    <AuthStyled>
      <AuthCard>
        <Header>
          <h1>Medi Assist</h1>
          <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>Sign in or sign up to access your personalized health assistant.</p>
        </Header>

        <Form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </label>

            {mode === 'signup' && (
              <label>
                Full name
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                />
              </label>
            )}

          {mode === 'signup' && (
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </label>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </Form>

        <SwitchMode>
          <p>
            {mode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}
          </p>
          <button type="button" onClick={() => {
            clearStatus();
            setMode(mode === 'login' ? 'signup' : 'login');
          }}>
            {mode === 'login' ? 'Create account' : 'Login instead'}
          </button>
        </SwitchMode>

        {error && <Alert type="error">{error}</Alert>}
        {message && <Alert type="success">{message}</Alert>}
      </AuthCard>
    </AuthStyled>
  );
}

const AuthStyled = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    padding: 32px 12px;
  }

  @media (max-width: 480px) {
    padding: 24px 10px;
  }
`;

const AuthCard = styled.div`
  width: min(480px, 100%);
  max-width: 480px;
  background: rgba(255, 255, 255, 0.84);
  border: 2px solid rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(18px);
  border-radius: 28px;
  padding: 40px 36px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    padding: 32px 28px;
  }

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 42px;
    font-weight: 800;
    background: linear-gradient(90deg, #7b2ff7, #f107a3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 12px;
  }

  h2 {
    font-size: 32px;
    font-weight: 800;
    background: linear-gradient(90deg, #cc99ff, #993366);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 14px;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 32px;
    }

    h2 {
      font-size: 24px;
    }

    p {
      font-size: 15px;
    }
  }

  p {
    color: #333;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 18px;

  label {
    display: grid;
    gap: 10px;
    font-weight: 600;
    color: #3d176b;
  }

  input {
    width: 100%;
    border-radius: 16px;
    border: 1px solid rgba(51, 51, 51, 0.18);
    padding: 16px 18px;
    font-size: 16px;
    color: #1f1f1f;
    background: rgba(255, 255, 255, 0.9);
  }

  input:focus {
    outline: none;
    border-color: #9f5fff;
    box-shadow: 0 0 0 4px rgba(155, 89, 255, 0.12);
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  border-radius: 16px;
  background: linear-gradient(90deg, #7b2ff7, #f107a3);
  color: white;
  font-size: 18px;
  font-weight: 700;
  padding: 16px 20px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 40px rgba(123, 97, 255, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SwitchMode = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  font-size: 15px;

  button {
    border: none;
    background: none;
    color: #7b2ff7;
    font-weight: 700;
    cursor: pointer;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Alert = styled.div`
  margin-top: 18px;
  padding: 14px 16px;
  border-radius: 14px;
  font-weight: 600;
  color: ${(props) => (props.type === 'error' ? '#750000' : '#0f3')};
  background: ${(props) => (props.type === 'error' ? 'rgba(255, 107, 107, 0.16)' : 'rgba(56, 206, 158, 0.18)')};
`;

export default AuthPage;
