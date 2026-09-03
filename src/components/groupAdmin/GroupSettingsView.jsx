import React, { useState } from 'react';
import { Settings, Link, Copy, RefreshCw, Trash2, CheckCircle, Lock } from 'lucide-react';

export const GroupSettingsView = ({ group }) => {
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description || '');
  const [privacy, setPrivacy] = useState('public');
  const [inviteLink, setInviteLink] = useState('https://chatflow.app/g/react-devs-98234');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRevokeLink = () => {
    setInviteLink(`https://chatflow.app/g/react-devs-${Date.now().toString().slice(-5)}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
          ⚙️ Group Settings & Channel Info
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Update channel identity, privacy parameters, invite links, and deletion options
        </p>
      </div>

      {/* General Settings */}
      <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>General Group Info</h4>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Group Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Group Privacy</label>
          <select value={privacy} onChange={(e) => setPrivacy(e.target.value)} className="input-field">
            <option value="public">🌐 Public (Anyone can search & join)</option>
            <option value="private">🔒 Private (Admin approval required)</option>
          </select>
        </div>
      </div>

      {/* Invite Link Manager */}
      <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>🔗 Channel Invite Link</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="text" value={inviteLink} readOnly className="input-field" style={{ flex: 1, fontFamily: 'monospace' }} />
          <button onClick={handleCopyLink} className="btn btn-primary" style={{ gap: '4px' }}>
            <Copy size={15} /> {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <button onClick={handleRevokeLink} className="btn btn-secondary" title="Revoke & Generate New Link">
            <RefreshCw size={15} /> Revoke
          </button>
        </div>
      </div>

      {/* Danger Zone: Delete Group */}
      <div className="glass-card" style={{ padding: '20px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#f87171' }}>Delete Group Channel</h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Soft delete channel and remove member access</p>
        </div>
        <button className="btn btn-danger" style={{ gap: '6px' }}>
          <Trash2 size={15} /> Delete Group
        </button>
      </div>
    </div>
  );
};
