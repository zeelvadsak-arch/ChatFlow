import React, { useRef, useEffect, useState } from 'react';
import {
  Phone,
  Video,
  Search,
  MoreVertical,
  Pin,
  Users,
  Shield,
  ShieldAlert,
  Image as FolderMediaIcon,
  UserCheck,
  Ban,
  Flag
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

export const ChatWindow = () => {
  const {
    activeChat,
    contacts,
    groups,
    initiateCall,
    setSelectedUserProfile,
    setReportUserModal,
    setMediaGalleryChat,
    blockUser,
    setGroupAdminModalGroup
  } = useChat();

  const [menuOpen, setMenuOpen] = useState(false);
  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const [chatSearchText, setChatSearchText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, activeChat?.typing]);

  if (!activeChat) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        Select a conversation to start messaging
      </div>
    );
  }

  const targetContact = contacts.find((c) => c.id === activeChat.contactId) || {
    name: activeChat.name,
    avatar: activeChat.avatar,
    status: activeChat.status || 'online',
    lastSeen: 'Online',
    bio: 'ChatFlow User'
  };

  const filteredMessages = activeChat.messages.filter((m) =>
    chatSearchText ? m.text?.toLowerCase().includes(chatSearchText.toLowerCase()) : true
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Header Bar */}
      <div
        style={{
          padding: '12px 20px',
          background: 'var(--bg-sidebar)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10
        }}
      >
        {/* Contact/Group Info */}
        <div
          onClick={() => setSelectedUserProfile(targetContact)}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{ position: 'relative' }}>
            <img
              src={activeChat.avatar}
              alt={activeChat.name}
              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
            />
            {activeChat.type === 'direct' && (
              <span className={`status-badge ${activeChat.status || 'online'}`}></span>
            )}
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {activeChat.name}
            </h3>
            <span style={{ fontSize: '0.78rem', color: activeChat.typing ? 'var(--primary)' : 'var(--text-muted)' }}>
              {activeChat.typing
                ? `${activeChat.name.split(' ')[0]} is typing...`
                : activeChat.type === 'group'
                ? `${activeChat.membersCount} members`
                : activeChat.status === 'online'
                ? '🟢 Online'
                : 'Last seen today'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
          {/* Voice Call */}
          <button
            onClick={() => initiateCall(targetContact, 'voice')}
            className="btn-icon"
            title="Voice Call"
          >
            <Phone size={18} />
          </button>

          {/* Video Call */}
          <button
            onClick={() => initiateCall(targetContact, 'video')}
            className="btn-icon"
            title="Video Call"
          >
            <Video size={18} />
          </button>

          {/* Group Admin Panel Trigger */}
          {activeChat.type === 'group' && (
            <button
              onClick={() => setGroupAdminModalGroup(activeChat)}
              className="btn btn-secondary"
              style={{ padding: '5px 10px', fontSize: '0.78rem', gap: '4px', background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc', border: '1px solid rgba(139, 92, 246, 0.3)' }}
              title="Open Group Admin Panel"
            >
              <Shield size={14} /> Group Admin
            </button>
          )}

          {/* Search in Chat Toggle */}
          <button
            onClick={() => setChatSearchOpen(!chatSearchOpen)}
            className={`btn-icon ${chatSearchOpen ? 'active' : ''}`}
            title="Search in Chat"
          >
            <Search size={18} />
          </button>

          {/* Context Options Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn-icon"
            title="More Options"
          >
            <MoreVertical size={18} />
          </button>

          {/* Dropdown Options */}
          {menuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: '0',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '6px',
                width: '190px',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 30,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}
              className="animate-pop"
            >
              <button
                onClick={() => {
                  setSelectedUserProfile(targetContact);
                  setMenuOpen(false);
                }}
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', fontSize: '0.82rem', padding: '6px 10px' }}
              >
                <UserCheck size={15} /> View Profile
              </button>
              <button
                onClick={() => {
                  setMediaGalleryChat(activeChat);
                  setMenuOpen(false);
                }}
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', fontSize: '0.82rem', padding: '6px 10px' }}
              >
                <FolderMediaIcon size={15} /> Shared Media
              </button>
              <button
                onClick={() => {
                  blockUser(targetContact);
                  setMenuOpen(false);
                }}
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', fontSize: '0.82rem', padding: '6px 10px', color: '#f87171' }}
              >
                <Ban size={15} /> Block User
              </button>
              <button
                onClick={() => {
                  setReportUserModal({ targetName: activeChat.name, contact: targetContact });
                  setMenuOpen(false);
                }}
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', fontSize: '0.82rem', padding: '6px 10px', color: '#f87171' }}
              >
                <Flag size={15} /> Report User
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat Search Header Overlay */}
      {chatSearchOpen && (
        <div style={{ padding: '8px 20px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder={`Search in conversation with ${activeChat.name}...`}
            value={chatSearchText}
            onChange={(e) => setChatSearchText(e.target.value)}
            className="input-field"
            style={{ height: '34px', fontSize: '0.82rem' }}
          />
        </div>
      )}

      {/* Pinned Message Bar if active */}
      {activeChat.pinnedMessage && (
        <div
          style={{
            padding: '8px 20px',
            background: 'rgba(99, 102, 241, 0.12)',
            borderBottom: '1px solid var(--primary-glow)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.82rem'
          }}
        >
          <Pin size={15} color="var(--primary)" />
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: '600', color: 'var(--primary)' }}>Pinned Message: </span>
            <span style={{ color: 'var(--text-main)' }}>{activeChat.pinnedMessage.text}</span>
          </div>
        </div>
      )}

      {/* Message Feed Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', margin: '10px 0 20px', color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: '500' }}>
          <span>🔒 End-to-End Encrypted Session</span>
        </div>

        {filteredMessages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMine={msg.senderId === 'usr_me'}
          />
        ))}

        {/* Real-time Typing Indicator Bubble */}
        {activeChat.typing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }} className="animate-fade">
            <div
              style={{
                padding: '10px 16px',
                borderRadius: '16px 16px 16px 4px',
                background: 'var(--msg-other)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input */}
      <MessageInput />
    </div>
  );
};
