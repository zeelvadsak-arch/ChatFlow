import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Eye,
  Lock,
  Palette,
  Bell,
  Ban,
  Monitor,
  Key,
  Smartphone,
  Check
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const SettingsView = () => {
  const {
    theme,
    setTheme,
    chatWallpaper,
    setChatWallpaper,
    privacySettings,
    setPrivacySettings,
    blockedUsers,
    unblockUser
  } = useChat();

  const [activeSubTab, setActiveSubTab] = useState('privacy'); // 'privacy', 'security', 'appearance', 'notifications', 'blocked'

  return (
    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>System Settings & Preferences</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Configure privacy, active sessions, theme appearance, and notification behavior</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px' }}>
        {/* Settings Navigation Menu */}
        <div className="glass-card" style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px', height: 'fit-content' }}>
          {[
            { id: 'privacy', label: 'Privacy Control', icon: Eye },
            { id: 'security', label: 'Security & 2FA', icon: Lock },
            { id: 'appearance', label: 'Appearance & Theme', icon: Palette },
            { id: 'blocked', label: 'Blocked Accounts', icon: Ban }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSubTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSubTab(item.id)}
                className="btn"
                style={{
                  justifyContent: 'flex-start',
                  padding: '10px 12px',
                  fontSize: '0.84rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--primary-glow)' : 'transparent',
                  color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--primary)' : '1px solid transparent'
                }}
              >
                <Icon size={16} color={isActive ? 'var(--primary)' : 'currentColor'} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Setting Panel Content */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activeSubTab === 'privacy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Privacy Controls
              </h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>Read Receipts (🔵✓✓)</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Show blue checkmarks when you read messages</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.readReceipts}
                  onChange={(e) => setPrivacySettings({ ...privacySettings, readReceipts: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>Typing Indicator</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Broadcast "typing..." status when you type a message</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.typingIndicator}
                  onChange={(e) => setPrivacySettings({ ...privacySettings, typingIndicator: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>Who Can See My Last Seen</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Control visibility of your online status</p>
                </div>
                <select
                  value={privacySettings.lastSeen}
                  onChange={(e) => setPrivacySettings({ ...privacySettings, lastSeen: e.target.value })}
                  className="input-field"
                  style={{ width: '140px', height: '34px', fontSize: '0.8rem' }}
                >
                  <option value="everyone">Everyone</option>
                  <option value="contacts">My Contacts</option>
                  <option value="nobody">Nobody</option>
                </select>
              </div>
            </div>
          )}

          {activeSubTab === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Security & Two-Factor Auth
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>Change Password</h4>
                <input type="password" placeholder="Current Password" className="input-field" style={{ height: '36px' }} />
                <input type="password" placeholder="New Password" className="input-field" style={{ height: '36px' }} />
                <button className="btn btn-primary" style={{ width: 'fit-content', fontSize: '0.82rem' }}>
                  Update Password
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>Two-Factor Authentication (2FA)</h4>
                  <p style={{ fontSize: '0.78rem', color: '#22c55e', fontWeight: '600' }}>Enabled via Authenticator App</p>
                </div>
                <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>Configure 2FA</button>
              </div>
            </div>
          )}

          {activeSubTab === 'appearance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Appearance & Theme
              </h3>

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px' }}>Interface Theme</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setTheme('dark')}
                    className="btn"
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: theme === 'dark' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    🌙 Dark Glassmorphism
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className="btn"
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: theme === 'light' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    ☀️ Light Theme
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'blocked' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Blocked Contacts List ({blockedUsers.length})
              </h3>
              {blockedUsers.length === 0 ? (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>No blocked users currently</span>
              ) : (
                blockedUsers.map((b) => (
                  <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>{b.name}</span>
                    <button onClick={() => unblockUser(b.id)} className="btn btn-secondary" style={{ fontSize: '0.75rem' }}>
                      Unblock
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
