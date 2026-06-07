import React, { useState } from 'react';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (email: string, password: string) => Promise<void>;
  error: string | null;
}

export const AuthForm = ({ type, onSubmit, error }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!email || !password) {
      setValidationError('이메일과 비밀번호를 모두 입력해 주세요.');
      return;
    }

    if (password.length < 6) {
      setValidationError('비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(email, password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "20px" }}>
      <h2 style={{ margin: "0 0 10px 0" }}>{type === 'login' ? '로그인' : '회원가입'}</h2>
      
      <div className="input-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label htmlFor="email" style={{ fontWeight: "bold", fontSize: "14px" }}>이메일</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@hufs.ac.kr"
          disabled={isSubmitting}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
      </div>

      <div className="input-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label htmlFor="password" style={{ fontWeight: "bold", fontSize: "14px" }}>비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="6자리 이상 입력"
          disabled={isSubmitting}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
      </div>

      {(validationError || error) && (
        <p className="error-message" style={{ color: "red", fontSize: "13px", margin: "0" }}>{validationError || error}</p>
      )}

      <button type="submit" disabled={isSubmitting} className="auth-submit-btn" style={{ padding: "12px", background: "#ff8e3c", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
        {isSubmitting ? '처리 중...' : type === 'login' ? '로그인' : '가입하기'}
      </button>
    </form>
  );
};
