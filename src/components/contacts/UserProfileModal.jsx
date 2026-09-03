import React from 'react';
import { X, MessageSquare, Phone, Ban, Flag, Users, Image } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const UserProfileModal = () => {
  const {
    selectedUserProfile,
    setSelectedUserProfile,
    setActiveTab,
    setActiveChatId,
    initiateCall,
    blockUser,
    setReportUserModal
  } = useChat();

  if (!selectedUserProfile) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 110 }}>
      <div
        className="glass-panel animate-pop"
        style={{
          width: '420px',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <button
          onClick={() => setSelectedUserProfile(null)}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ position: 'relative' }}>
          <img src={selectedUserProfile.avatar} alt={selectedUserProfile.name} style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }} />
          <span className={`status-badge ${selectedUserProfile.status || 'online'}`} style={{ width: '16px', height: '16px' }}></span>
        </div>

        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>{selectedUserProfile.name}</h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--primary)' }}>@{selectedUserProfile.username}</span>
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          {selectedUserProfile.bio || 'ChatFlow User'}
        </p>

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <button
            onClick={() => {
              setActiveChatId('chat_c1');
              setActiveTab('chats');
              setSelectedUserProfile(null);
            }}
            className="btn btn-primary"
            style={{ flex: 1, fontSize: '0.82rem' }}
          >
            <MessageSquare size={15} /> Direct Message
          </button>
          <button
            onClick={() => {
              initiateCall(selectedUserProfile, 'voice');
              setSelectedUserProfile(null);
            }}
            className="btn btn-secondary"
            style={{ flex: 1, fontSize: '0.82rem' }}
          >
            <Phone size={15} /> Voice Call
          </button>
        </div>

        {/* Actions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
          <button
            onClick={() => {
              blockUser(selectedUserProfile);
            }}
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start', color: '#f87171', fontSize: '0.82rem' }}
          >
            <Ban size={15} /> Block User
          </button>
          <button
            onClick={() => {
              setReportUserModal({ targetName: selectedUserProfile.name, contact: selectedUserProfile });
              setSelectedUserProfile(null);
            }}
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start', color: '#f87171', fontSize: '0.82rem' }}
          >
            <Flag size={15} /> Report User
          </button>
        </div>
      </div>
    </div>
  );
};
