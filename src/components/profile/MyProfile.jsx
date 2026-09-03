import React, { useState } from 'react';
import { User, Mail, Phone, ShieldCheck, Edit3, Camera, Lock, Key, Smartphone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [statusMsg, setStatusMsg] = useState('Available for chat');

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({ name, bio });
    setIsEditing(false);
  };

  return (
    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>My Profile</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage your personal details, status, and security preferences</p>
        </div>

        <button onClick={() => setIsEditing(!isEditing)} className="btn btn-primary">
          <Edit3 size={16} /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Avatar Card */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <img src={user.avatar} alt={user.name} style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }} />
            <button className="btn-icon" style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--primary)', color: '#fff' }} title="Change Avatar">
              <Camera size={16} />
            </button>
          </div>

          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{user.name}</h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--primary)' }}>@{user.username}</span>
          </div>

          <div style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.03)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            "{user.bio}"
          </div>
        </div>

        {/* Form Details / View Card */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Account Information</h3>

          {isEditing ? (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>Bio / About</label>
                <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} className="input-field" />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                Save Changes
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={18} color="var(--primary)" />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Email Address</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>{user.email}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={18} color="var(--primary)" />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Phone Number</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>{user.phone}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShieldCheck size={18} color="#22c55e" />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Account Verification</span>
                  <span style={{ color: '#22c55e', fontWeight: '600' }}>JWT Authenticated & Verified</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
