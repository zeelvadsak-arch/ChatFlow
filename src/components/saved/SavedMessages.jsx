import React, { useState } from 'react';
import { Bookmark, Search, Trash2, ExternalLink } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const SavedMessages = () => {
  const { savedMessages, setSavedMessages } = useChat();
  const [search, setSearch] = useState('');

  const removeSaved = (id) => {
    setSavedMessages(savedMessages.filter((s) => s.id !== id));
  };

  const filtered = savedMessages.filter(
    (s) => s.text.toLowerCase().includes(search.toLowerCase()) || s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>⭐ Saved Messages</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Important notes, links, and code snippets bookmarked across chats</p>
        </div>

        <div style={{ position: 'relative', width: '240px' }}>
          <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search saved..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '36px', height: '36px', fontSize: '0.82rem' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {filtered.map((item) => (
          <div key={item.id} className="glass-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '600' }}>
                From {item.chatName}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{item.time}</span>
            </div>

            <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>{item.title}</h4>

            <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--secondary)', fontSize: '0.84rem', fontFamily: 'monospace', color: '#e2e8f0', wordBreak: 'break-all' }}>
              {item.text}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button onClick={() => removeSaved(item.id)} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#ef4444' }}>
                <Trash2 size={13} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
