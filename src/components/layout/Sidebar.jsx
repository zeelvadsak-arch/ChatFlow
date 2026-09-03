import React from 'react';
import {
  MessageSquare,
  Users,
  UserCheck,
  Phone,
  Bell,
  Bookmark,
  Search,
  User,
  Settings,
  Shield,
  LogOut,
  LayoutDashboard,
  Moon,
  Sun,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { activeTab, setActiveTab, notifications, theme, setTheme } = useChat();
  const { user, logout } = useAuth();

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chats', label: 'Chats', icon: MessageSquare, badge: 2 },
    { id: 'contacts', label: 'Contacts', icon: UserCheck },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'calls', label: 'Calls', icon: Phone },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifications },
    { id: 'saved', label: 'Saved Messages', icon: Bookmark },
    { id: 'search', label: 'Global Search', icon: Search },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="sidebar-container animate-fade">
      {/* Brand Header */}
      <div style={{ padding: '20px 18px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px var(--primary-glow)'
          }}
        >
          <Sparkles size={22} color="#ffffff" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ChatFlow
          </h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: '500' }}>
            Enterprise v2.4
          </span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="btn"
              style={{
                justifyContent: 'flex-start',
                padding: '10px 14px',
                width: '100%',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive
                  ? 'var(--primary-glow)'
                  : item.highlight
                  ? 'rgba(139, 92, 246, 0.08)'
                  : 'transparent',
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                border: isActive ? '1px solid var(--primary)' : '1px solid transparent',
                fontWeight: isActive ? '600' : '500',
                position: 'relative'
              }}
            >
              <Icon size={19} color={isActive ? 'var(--primary)' : item.highlight ? '#8b5cf6' : 'currentColor'} />
              <span style={{ fontSize: '0.9rem', flex: 1, textAlign: 'left' }}>{item.label}</span>
              
              {item.badge > 0 && (
                <span className="badge" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>
                  {item.badge}
                </span>
              )}
              {item.highlight && !isActive && (
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6' }}></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Profile & Theme Toggle */}
      <div style={{ padding: '14px 14px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User'}
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span className="status-badge online"></span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>
                {user?.name || 'User'}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                @{user?.username || 'user'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="btn-icon"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        <button
          onClick={logout}
          className="btn btn-secondary"
          style={{ width: '100%', padding: '8px', fontSize: '0.82rem', gap: '6px' }}
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
