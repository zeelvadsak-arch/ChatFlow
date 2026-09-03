import React, { useState } from 'react';
import { Search, UserCheck, Star, UserPlus, Ban, Phone, MessageSquare, ShieldAlert } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const ContactList = () => {
  const {
    contacts,
    setContacts,
    chats,
    selectChat,
    addNewContact,
    setActiveTab,
    initiateCall,
    setSelectedUserProfile,
    blockedUsers,
    unblockUser
  } = useChat();

  const [activeSubTab, setActiveSubTab] = useState('all'); // 'all', 'online', 'favorites', 'requests', 'blocked'
  const [search, setSearch] = useState('');

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.username.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeSubTab === 'online') return c.status === 'online';
    if (activeSubTab === 'favorites') return c.favorite;
    if (activeSubTab === 'requests') return c.requestPending;
    return true;
  });

  const acceptRequest = (contactId) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, isFriend: true, requestPending: false } : c))
    );
  };

  const rejectRequest = (contactId) => {
    setContacts((prev) => prev.filter((c) => c.id !== contactId));
  };

  return (
    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      {/* Header & Sub-tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>Contacts & People</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage your network, online friends, and friend requests</p>
        </div>

        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '36px', height: '36px', fontSize: '0.84rem' }}
          />
        </div>
      </div>

      {/* Sub Tabs Filter */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
        {[
          { id: 'all', label: 'All Contacts', count: contacts.filter(c => !c.requestPending).length },
          { id: 'online', label: 'Online Now', count: contacts.filter(c => c.status === 'online').length },
          { id: 'favorites', label: 'Favorites', count: contacts.filter(c => c.favorite).length },
          { id: 'requests', label: 'Requests', count: contacts.filter(c => c.requestPending).length },
          { id: 'blocked', label: 'Blocked', count: blockedUsers.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className="btn"
            style={{
              padding: '6px 14px',
              fontSize: '0.82rem',
              borderRadius: 'var(--radius-full)',
              background: activeSubTab === tab.id ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
              color: activeSubTab === tab.id ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            {tab.label} {tab.count > 0 && <span style={{ opacity: 0.8, fontSize: '0.75rem' }}>({tab.count})</span>}
          </button>
        ))}
      </div>

      {/* Content View */}
      {activeSubTab === 'blocked' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {blockedUsers.length === 0 ? (
            <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', gridColumn: '1 / -1' }}>No blocked users</div>
          ) : (
            blockedUsers.map((user) => (
              <div key={user.id} className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={user.avatar} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>{user.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>@{user.username}</span>
                  </div>
                </div>
                <button onClick={() => unblockUser(user.id)} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                  Unblock
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="glass-card"
              style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <img src={contact.avatar} alt={contact.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span className={`status-badge ${contact.status}`}></span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>{contact.name}</h4>
                    {contact.favorite && <Star size={14} color="#eab308" fill="#eab308" />}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>@{contact.username}</span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {contact.bio}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              {contact.requestPending ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => acceptRequest(contact.id)} className="btn btn-primary" style={{ flex: 1, fontSize: '0.8rem', padding: '6px' }}>
                    Accept Request
                  </button>
                  <button onClick={() => rejectRequest(contact.id)} className="btn btn-secondary" style={{ flex: 1, fontSize: '0.8rem', padding: '6px' }}>
                    Decline
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      const existingChat = chats.find((c) => c.contactId === contact.id || c.id === 'chat_' + contact.id);
                      if (existingChat) {
                        selectChat(existingChat.id);
                      } else {
                        addNewContact(contact.name, contact.username);
                      }
                      setActiveTab('chats');
                    }}
                    className="btn btn-primary"
                    style={{ flex: 1, fontSize: '0.8rem', padding: '6px', gap: '4px' }}
                  >
                    <MessageSquare size={14} /> Message
                  </button>
                  <button onClick={() => initiateCall(contact, 'voice')} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 10px' }}>
                    <Phone size={14} />
                  </button>
                  <button onClick={() => setSelectedUserProfile(contact)} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 10px' }}>
                    Profile
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
