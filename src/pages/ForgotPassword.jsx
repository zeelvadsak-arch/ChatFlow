import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ForgotPasswordPage = ({ onNavigateToReset, onNavigateToLogin }) => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your account email');
      return;
    }

    const res = await forgotPassword(email);
    if (res.success) {
      onNavigateToReset(email);
    } else {
      setError(res.message || 'Error sending password reset request');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel animate-pop" style={{ width: '420px', borderRadius: 'var(--radius-lg)', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Forgot Password?</h2>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Enter your email address to receive password reset OTP</span>
        </div>

        {error && (
          <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.8rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="email"
              placeholder="Registered Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '40px', height: '42px' }}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '42px', fontSize: '0.9rem', gap: '6px' }}>
            Send Reset OTP <ArrowRight size={16} />
          </button>
        </form>

        <button onClick={onNavigateToLogin} className="btn btn-secondary" style={{ width: '100%', gap: '6px', fontSize: '0.82rem' }}>
          <ArrowLeft size={15} /> Back to Login
        </button>
      </div>
    </div>
  );
};
