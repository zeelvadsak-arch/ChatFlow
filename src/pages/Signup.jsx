import React, { useState } from 'react';
import { Sparkles, Mail, Lock, User, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignupPage = ({ onNavigateToLogin, onNavigateToVerify }) => {
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !username || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the Terms & Conditions');
      return;
    }

    const res = await signup(name, username, email, password);
    if (res.success) {
      onNavigateToVerify(email);
    } else {
      setError(res.message || 'Signup failed');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel animate-pop" style={{ width: '440px', borderRadius: 'var(--radius-lg)', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={24} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Create Account</h2>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Join ChatFlow Enterprise Platform</span>
        </div>

        {error && (
          <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.8rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <User size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" placeholder="Full Name *" value={name} onChange={(e) => setName(e.target.value)} className="input-field" style={{ paddingLeft: '36px', height: '40px' }} required />
          </div>

          <div style={{ position: 'relative' }}>
            <User size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" placeholder="Username (e.g. rahul_s) *" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" style={{ paddingLeft: '36px', height: '40px' }} required />
          </div>

          <div style={{ position: 'relative' }}>
            <Mail size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="email" placeholder="Email address *" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={{ paddingLeft: '36px', height: '40px' }} required />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="password" placeholder="Password *" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" style={{ paddingLeft: '36px', height: '40px' }} required />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="password" placeholder="Confirm Password *" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" style={{ paddingLeft: '36px', height: '40px' }} required />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
            <span>I agree to Terms & Conditions</span>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '42px', marginTop: '6px', fontSize: '0.9rem', gap: '6px' }}>
            Create Account <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <button onClick={onNavigateToLogin} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
