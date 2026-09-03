import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, RefreshCw, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const VerifyEmailPage = ({ email, onNavigateToLogin }) => {
  const { verifyOtp } = useAuth();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP code');
      return;
    }

    const res = await verifyOtp(email, otp);
    if (res.success) {
      setSuccess('Account activated successfully! Redirecting to login...');
      setTimeout(() => onNavigateToLogin(), 2000);
    } else {
      setError(res.message || 'Invalid OTP code');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel animate-pop" style={{ width: '420px', borderRadius: 'var(--radius-lg)', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={26} color="#22c55e" />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Email Verification</h2>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Enter OTP sent to <strong style={{ color: 'var(--text-main)' }}>{email || 'your email'}</strong></span>
        </div>

        {error && (
          <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.8rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', fontSize: '0.8rem', textAlign: 'center' }}>
            {success}
          </div>
        )}

        <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid var(--primary-glow)', color: 'var(--primary)', fontSize: '0.78rem', textAlign: 'center' }}>
          💡 <strong>Demo Mode OTP Code:</strong> Use <code>123456</code> to activate
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <KeyRound size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Enter 6-digit OTP (e.g. 123456)"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '40px', height: '42px', fontSize: '1rem', letterSpacing: '2px', fontWeight: '600', textAlign: 'center' }}
              maxLength={6}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '42px', fontSize: '0.9rem', gap: '6px' }}>
            Activate Account <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Didn't receive code?{' '}
          <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};
