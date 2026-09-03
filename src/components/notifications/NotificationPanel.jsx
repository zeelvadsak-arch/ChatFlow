import React from 'react';
import { Bell, MessageSquare, UserPlus, Phone, CheckCircle, Trash2 } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const NotificationPanel = () => {
  const { notifications, setNotifications, setActiveTab, setActiveChatId } = useChat();

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>Notifications Center</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Real-time socket alerts for messages, friend requests, and mentions</p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={markAllAsRead} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            <CheckCircle size={15} /> Mark All Read
          </button>
          <button onClick={clearAll} className="btn btn-secondary" style={{ fontSize: '0.8rem', color: '#ef4444' }}>
            <Trash2 size={15} /> Clear All
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            No new notifications
          </div>
        ) : (
          notifications.map((n) => {
            return (
              <div
                key={n.id}
                onClick={() => {
                  if (n.chatId) {
                    setActiveChatId(n.chatId);
                    setActiveTab('chats');
                  }
                }}
                className="glass-card"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  borderLeft: !n.read ? '4px solid var(--primary)' : '1px solid var(--border-color)',
                  background: !n.read ? 'rgba(99, 102, 241, 0.06)' : 'rgba(255, 255, 255, 0.03)',
                  cursor: n.chatId ? 'pointer' : 'default'
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {n.type === 'message' && <MessageSquare size={20} color="var(--primary)" />}
                  {n.type === 'friend_request' && <UserPlus size={20} color="#22c55e" />}
                  {n.type === 'call' && <Phone size={20} color="#ef4444" />}
                  {n.type === 'mention' && <Bell size={20} color="#8b5cf6" />}
                  {n.type === 'system' && <CheckCircle size={20} color="#eab308" />}
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main)' }}>{n.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>{n.description}</p>
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', flexShrink: 0 }}>{n.time}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
