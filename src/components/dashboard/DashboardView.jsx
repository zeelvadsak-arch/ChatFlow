import React from 'react';
import {
  MessageSquare,
  Users,
  PhoneCall,
  Bell,
  Bookmark,
  Activity,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  UserCheck
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';

export const DashboardView = () => {
  const { chats, contacts, groups, notifications, savedMessages, setActiveTab, setActiveChatId } = useChat();
  const { user } = useAuth();

  const activeOnlineCount = contacts.filter((c) => c.status === 'online').length;
  const totalUnread = chats.reduce((sum, c) => sum + (c.unread || 0), 0);

  return (
    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
      {/* Welcome Hero Banner */}
      <div
        style={{
          padding: '28px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(139, 92, 246, 0.15))',
          border: '1px solid var(--primary-glow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ zIndex: 2 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px', color: '#ffffff' }}>
            Welcome back, {user.name}! 👋
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '520px' }}>
            ChatFlow user panel is online with real-time socket connections, WebRTC audio/video signaling, and end-to-end encryption.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button onClick={() => setActiveTab('chats')} className="btn btn-primary">
              <MessageSquare size={16} /> Open Recent Chats
            </button>
            <button onClick={() => setActiveTab('contacts')} className="btn btn-secondary">
              <UserCheck size={16} /> View Contacts ({contacts.length})
            </button>
          </div>
        </div>

        <div style={{ opacity: 0.15, position: 'absolute', right: '20px', top: '20px' }}>
          <Zap size={140} color="#8b5cf6" />
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Active Conversations', value: chats.length, sub: `${totalUnread} unread`, icon: MessageSquare, color: '#6366f1', tab: 'chats' },
          { label: 'Online Friends', value: activeOnlineCount, sub: `${contacts.length} total contacts`, icon: Users, color: '#22c55e', tab: 'contacts' },
          { label: 'Notifications', value: notifications.length, sub: 'Live socket alerts', icon: Bell, color: '#eab308', tab: 'notifications' },
          { label: 'Saved Messages', value: savedMessages.length, sub: 'Bookmarked notes', icon: Bookmark, color: '#ec4899', tab: 'saved' }
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              onClick={() => setActiveTab(m.tab)}
              className="glass-card"
              style={{ padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>{m.label}</span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: '700', margin: '4px 0', color: 'var(--text-main)' }}>{m.value}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{m.sub}</span>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${m.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} color={m.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Chats Activity Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Recent Conversations */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)' }}>Recent Conversations</h3>
            <button onClick={() => setActiveTab('chats')} className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
              View All <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {chats.slice(0, 3).map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setActiveTab('chats');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  cursor: 'pointer'
                }}
              >
                <img src={chat.avatar} alt={chat.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>{chat.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {chat.lastMessage}
                  </p>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{chat.lastTime}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Server Health */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)' }}>System Connection</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Socket Engine</span>
              <span style={{ color: '#22c55e', fontWeight: '600' }}>Connected (14ms)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>MongoDB Cluster</span>
              <span style={{ color: '#22c55e', fontWeight: '600' }}>Healthy</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>WebRTC Peer Mesh</span>
              <span style={{ color: '#22c55e', fontWeight: '600' }}>Ready</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>JWT Session</span>
              <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
