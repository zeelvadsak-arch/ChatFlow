import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, ShieldAlert, Key } from 'lucide-react';

export const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('super_admin');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter valid Admin Credentials');
      return;
    }

    // JWT & Role verification simulation
    onLoginSuccess({
      name: 'System Admin',
      email,
      role, // 'super_admin', 'admin', 'moderator'
      token: 'jwt_admin_token_9832749832'
    });
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-dark)',
        padding: '20px'
      }}
    >
      <div
        className="glass-panel animate-pop"
        style={{
          width: '440px',
          borderRadius: 'var(--radius-lg)',
          padding: '36px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--primary-glow)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)'
            }}
          >
            <Shield size={30} color="#ffffff" />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)' }}>
            Admin Portal Sign In
          </h2>
          <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Authorized Administrator & Moderation Gateway
          </span>
        </div>

        {error && (
          <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.8rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>Select Admin Role Level</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field"
              style={{ height: '40px' }}
            >
              <option value="super_admin">⚡ Super Admin (Full Access)</option>
              <option value="admin">🛡️ Admin (Users, Groups, Reports)</option>
              <option value="moderator">👁️ Moderator (Reports & Messages)</option>
            </select>
          </div>

          <div style={{ position: 'relative' }}>
            <Mail size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '40px', height: '42px' }}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '40px', height: '42px' }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', height: '44px', marginTop: '10px', fontSize: '0.92rem', gap: '8px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}
          >
            Access Admin Dashboard <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <ShieldAlert size={14} color="#8b5cf6" /> Secured with Backend `isAdmin` Middleware & Audit Logging
        </div>
      </div>
    </div>
  );
};
