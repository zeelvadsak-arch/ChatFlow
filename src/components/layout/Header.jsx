import React, { useState } from 'react';
import { Search, Bell, PhoneCall, UserPlus, PlusCircle, Shield, CheckCircle2 } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const {
    activeTab,
    setActiveTab,
    notifications,
    setCreateGroupModalOpen,
    activeCall,
    setGlobalSearchQuery
  } = useChat();
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const titleMap = {
    dashboard: 'Dashboard Overview',
    chats: 'Chats & Direct Messages',
    contacts: 'Contacts & Friends',
    groups: 'Groups & Communities',
    calls: 'Calls & WebRTC History',
    notifications: 'Notifications Center',
    saved: 'Saved & Starred Messages',
    search: 'Global System Search',
    profile: 'User Profile Settings',
    settings: 'System Preferences & Security'
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      style={{
        height: '64px',
        padding: '0 24px',
        background: 'var(--bg-sidebar)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
      }}
    >
      {/* Tab Title & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
          {titleMap[activeTab] || 'ChatFlow'}
        </h1>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: '600',
            background: 'rgba(34, 197, 94, 0.12)',
            color: '#22c55e',
            border: '1px solid rgba(34, 197, 94, 0.25)'
          }}
        >
          <CheckCircle2 size={12} /> Live Socket
        </span>
      </div>

      {/* Action Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Search Bar Input */}
        <div style={{ position: 'relative', width: '220px' }}>
          <Search
            size={16}
            color="var(--text-dim)"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Quick search..."
            className="input-field"
            style={{ paddingLeft: '36px', height: '36px', fontSize: '0.82rem' }}
            onChange={(e) => {
              setGlobalSearchQuery(e.target.value);
              if (e.target.value && activeTab !== 'search') {
                setActiveTab('search');
              }
            }}
          />
        </div>

        {/* Create Group Quick Action */}
        <button
          onClick={() => setCreateGroupModalOpen(true)}
          className="btn btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.82rem', height: '36px' }}
        >
          <PlusCircle size={16} /> New Group
        </button>

        {/* Call Banner if Active */}
        {activeCall && (
          <button
            className="btn btn-primary animate-pop"
            style={{ padding: '6px 12px', fontSize: '0.8rem', height: '36px', gap: '6px' }}
          >
            <PhoneCall size={15} /> Call with {activeCall.contact.name}
          </button>
        )}

        {/* Notifications Icon with Badge */}
        <button
          onClick={() => setActiveTab('notifications')}
          className={`btn-icon ${activeTab === 'notifications' ? 'active' : ''}`}
          style={{ position: 'relative' }}
          title="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#ef4444',
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)'
              }}
            ></span>
          )}
        </button>

        {/* User Avatar Direct Access */}
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: 0
          }}
          title="View Profile"
        >
          <img
            src={user.avatar}
            alt={user.name}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--primary-glow)'
            }}
          />
        </button>
      </div>
    </header>
  );
};
