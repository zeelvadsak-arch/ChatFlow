import React, { useState } from 'react';
import { Lock, KeyRound, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ResetPasswordPage = ({ email, onNavigateToLogin }) => {
  const { resetPassword } = useAuth();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp || !newPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = await resetPassword(email, otp, newPassword);
    if (res.success) {
      setSuccess('Password updated successfully! Redirecting to login...');
      setTimeout(() => onNavigateToLogin(), 2000);
    } else {
      setError(res.message || 'Invalid OTP code');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel animate-pop" style={{ width: '420px', borderRadius: 'var(--radius-lg)', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Reset Password</h2>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Enter OTP code and set your new password</span>
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
          💡 <strong>Reset OTP Code:</strong> Use <code>654321</code>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <KeyRound size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="6-digit Reset OTP (e.g. 654321)"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '40px', height: '40px', textAlign: 'center', letterSpacing: '2px', fontWeight: '600' }}
              maxLength={6}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '40px', height: '40px' }}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '40px', height: '40px' }}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '42px', marginTop: '6px', fontSize: '0.9rem', gap: '6px' }}>
            Update Password <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
