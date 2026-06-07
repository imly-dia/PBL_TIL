import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthForm } from '../components/AuthForm';

export const LoginPage = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [serverError, setServerError] = useState<string | null>(null);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleAuthSubmit = async (email: string, password: string) => {
    setServerError(null);
    try {
      if (mode === 'login') {
        await signIn(email, password);
        navigate('/');
      } else {
        await signUp(email, password);
        alert('회원가입이 완료되었습니다! 로그인해 주세요.');
        setMode('login');
      }
    } catch (err: any) {
      setServerError(err.message || '인증에 실패했습니다.');
    }
  };

  return (
   
    <div className="auth-page-container" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      width: "100%",
      backgroundColor: "#f9f9fb",
      padding: "20px",
      boxSizing: "border-box"
    }}>
     
      <div className="auth-card" style={{
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
        width: "100%",
        maxWidth: "400px",
        boxSizing: "border-box"
      }}>
        <AuthForm type={mode} onSubmit={handleAuthSubmit} error={serverError} />
   
        <div className="auth-toggle" style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "14px",
          color: "#666"
        }}>
          {mode === 'login' ? (
            <p style={{ margin: 0 }}>
              계정이 없으신가요?{' '}
              <button 
                type="button" 
                onClick={() => { setMode('signup'); setServerError(null); }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ff8e3c",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: "0 4px"
                }}
              >
                회원가입하기
              </button>
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              이미 계정이 있으신가요?{' '}
              <button 
                type="button" 
                onClick={() => { setMode('login'); setServerError(null); }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ff8e3c",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: "0 4px"
                }}
              >
                로그인하기
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};