import React, { useState } from 'react';
import { Search, User, MessageSquare, Users, FileText, Image } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const GlobalSearch = () => {
  const { globalSearchQuery, setGlobalSearchQuery, contacts, chats, groups, setActiveTab, setActiveChatId } = useChat();
  const [filterType, setFilterType] = useState('all'); // 'all', 'users', 'messages', 'groups'

  const matchedContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(globalSearchQuery.toLowerCase())
  );

  const matchedChats = chats.filter((c) =>
    c.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
    c.messages.some((m) => m.text?.toLowerCase().includes(globalSearchQuery.toLowerCase()))
  );

  return (
    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>Global System Search</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Search across users, conversations, groups, media, and attachments</p>
      </div>

      <div style={{ position: 'relative' }}>
        <Search size={20} color="var(--primary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Type to search anything in ChatFlow..."
          value={globalSearchQuery}
          onChange={(e) => setGlobalSearchQuery(e.target.value)}
          className="input-field"
          style={{ paddingLeft: '48px', height: '48px', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {['all', 'users', 'messages', 'groups'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className="btn"
            style={{
              padding: '6px 14px',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-full)',
              background: filterType === t ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: filterType === t ? '#fff' : 'var(--text-muted)',
              textTransform: 'capitalize'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {matchedContacts.length > 0 && (filterType === 'all' || filterType === 'users') && (
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Matched Users ({matchedContacts.length})</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
              {matchedContacts.map((c) => (
                <div key={c.id} className="glass-card" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={c.avatar} alt={c.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: '600' }}>{c.name}</h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>@{c.username}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {matchedChats.length > 0 && (filterType === 'all' || filterType === 'messages') && (
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Matched Conversations & Messages</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {matchedChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setActiveTab('chats');
                  }}
                  className="glass-card"
                  style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={chat.avatar} alt={chat.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h5 style={{ fontSize: '0.9rem', fontWeight: '600' }}>{chat.name}</h5>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{chat.lastMessage}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{chat.lastTime}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
