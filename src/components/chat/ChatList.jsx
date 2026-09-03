import React, { useState } from 'react';
import { Search, Pin, Archive, CheckCheck, Users, Filter, Plus } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const ChatList = () => {
  const { chats, activeChatId, setActiveChatId, setCreateGroupModalOpen } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // 'all', 'unread', 'pinned', 'groups'

  const filteredChats = chats.filter((chat) => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterTab === 'unread') return chat.unread > 0;
    if (filterTab === 'pinned') return chat.pinned;
    if (filterTab === 'groups') return chat.type === 'group';
    return true;
  });

  return (
    <div
      style={{
        width: '320px',
        minWidth: '320px',
        height: '100%',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Search Header */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>
            Chats
          </h3>
          <button
            onClick={() => setCreateGroupModalOpen(true)}
            className="btn-icon"
            title="Create New Group"
          >
            <Plus size={18} />
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            color="var(--text-dim)"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '36px', height: '36px', fontSize: '0.84rem' }}
          />
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'unread', label: 'Unread' },
            { id: 'pinned', label: 'Pinned' },
            { id: 'groups', label: 'Groups' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              style={{
                flex: 1,
                padding: '5px 0',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: filterTab === tab.id ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                color: filterTab === tab.id ? '#ffffff' : 'var(--text-muted)',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {filteredChats.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            No conversations found
          </div>
        ) : (
          filteredChats.map((chat) => {
            const isActive = chat.id === activeChatId;
            return (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--bg-card-hover)' : 'transparent',
                  border: isActive ? '1px solid var(--primary-glow)' : '1px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '4px',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
                className="glass-card"
              >
                {/* Avatar with Status */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  {chat.type === 'direct' && (
                    <span className={`status-badge ${chat.status || 'offline'}`}></span>
                  )}
                  {chat.type === 'group' && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: 'var(--secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Users size={10} color="#ffffff" />
                    </span>
                  )}
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {chat.name}
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', flexShrink: 0 }}>
                      {chat.lastTime}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '0.8rem', color: chat.typing ? 'var(--primary)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {chat.typing ? 'typing...' : chat.lastMessage}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      {chat.pinned && <Pin size={12} color="var(--primary)" />}
                      {chat.unread > 0 && (
                        <span className="badge" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
