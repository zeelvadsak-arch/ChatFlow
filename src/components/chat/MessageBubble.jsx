import React, { useState } from 'react';
import {
  Check,
  CheckCheck,
  MoreVertical,
  Reply,
  Edit2,
  Trash2,
  Pin,
  Bookmark,
  Smile,
  FileText,
  Play,
  Volume2,
  Download,
  ExternalLink,
  User,
  MapPin,
  Film,
  Music
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const MessageBubble = ({ message, isMine }) => {
  const {
    addReaction,
    deleteMessage,
    pinMessage,
    saveMessage,
    setReplyToMessage,
    setEditingMessage
  } = useChat();

  const [showMenu, setShowMenu] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const emojiOptions = ['👍', '❤️', '😂', '🔥', '😮', '🚀', '🙌'];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMine ? 'flex-end' : 'flex-start',
        marginBottom: '14px',
        position: 'relative',
        maxWidth: '75%'
      }}
      className="animate-fade"
    >
      {/* Sender Name in Group Chat */}
      {!isMine && message.senderName && (
        <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '3px', marginLeft: '4px' }}>
          {message.senderName}
        </span>
      )}

      {/* Main Bubble Container */}
      <div
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => {
          setShowMenu(false);
          setShowReactions(false);
        }}
        style={{
          position: 'relative',
          padding: '10px 14px',
          borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          background: isMine
            ? 'linear-gradient(135deg, var(--msg-mine), #4f46e5)'
            : 'var(--msg-other)',
          color: '#ffffff',
          boxShadow: isMine ? '0 4px 14px rgba(99, 102, 241, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.2)',
          border: isMine ? 'none' : '1px solid var(--border-color)',
          fontSize: '0.9rem',
          lineHeight: '1.45'
        }}
      >
        {/* Reply Quote target if attached */}
        {message.replyTo && (
          <div
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.25)',
              borderLeft: '3px solid var(--primary)',
              marginBottom: '6px',
              fontSize: '0.78rem'
            }}
          >
            <span style={{ fontWeight: '600', color: '#a5b4fc', display: 'block' }}>
              {message.replyTo.senderName}
            </span>
            <span style={{ opacity: 0.85, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
              {message.replyTo.text}
            </span>
          </div>
        )}

        {/* Text Content */}
        {message.text && (
          <div style={{ wordBreak: 'break-word' }}>
            {message.text}
            {message.isEdited && (
              <span style={{ fontSize: '0.68rem', opacity: 0.7, marginLeft: '6px' }}>(edited)</span>
            )}
          </div>
        )}

        {/* Media Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {message.attachments.map((att, idx) => (
              <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden' }}>
                {/* Image Attachment */}
                {att.type === 'image' && (
                  <img
                    src={att.url}
                    alt={att.title || 'Attached Image'}
                    style={{ maxWidth: '100%', maxHeight: '240px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={() => window.open(att.url, '_blank')}
                  />
                )}

                {/* Video Attachment */}
                {att.type === 'video' && (
                  <video
                    src={att.url}
                    controls
                    style={{ maxWidth: '100%', maxHeight: '240px', borderRadius: '8px', outline: 'none' }}
                  />
                )}

                {/* Audio Attachment */}
                {att.type === 'audio' && (
                  <div style={{ padding: '6px', background: 'rgba(0,0,0,0.25)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '4px', display: 'block' }}>🎵 {att.title}</span>
                    <audio src={att.url} controls style={{ width: '100%', height: '36px' }} />
                  </div>
                )}

                {/* Document / PDF / File Attachment */}
                {(att.type === 'file' || att.type === 'pdf') && (
                  <a
                    href={att.url || '#'}
                    download={att.title}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: att.type === 'pdf' ? '#ef4444' : '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FileText size={20} color="#ffffff" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: '600', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {att.title}
                      </span>
                      {att.size && <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>{att.size}</span>}
                    </div>
                    <Download size={16} style={{ flexShrink: 0, opacity: 0.8 }} />
                  </a>
                )}

                {/* Contact Card Attachment */}
                {att.type === 'contact' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'rgba(0,0,0,0.25)', borderRadius: '8px' }}>
                    <img src={att.avatar} alt={att.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block' }}>{att.name}</span>
                      <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>@{att.username}</span>
                    </div>
                  </div>
                )}

                {/* Location Attachment */}
                {att.type === 'location' && (
                  <a
                    href={att.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '8px', color: '#ffffff', textDecoration: 'none' }}
                  >
                    <MapPin size={22} color="#10b981" />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: '700', display: 'block' }}>{att.title}</span>
                      <span style={{ fontSize: '0.72rem', color: '#6ee7b7' }}>Click to view on Google Maps</span>
                    </div>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Voice Note Visualizer */}
        {message.voiceUrl && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0', minWidth: '180px' }}>
            <button className="btn-icon" style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              <Play size={14} />
            </button>
            <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px', position: 'relative' }}>
              <div style={{ width: '40%', height: '100%', background: '#fff', borderRadius: '2px' }}></div>
            </div>
            <span style={{ fontSize: '0.72rem', opacity: 0.8 }}>0:12</span>
          </div>
        )}

        {/* Bottom Time & Status Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '4px',
            marginTop: '4px',
            fontSize: '0.68rem',
            opacity: 0.8
          }}
        >
          <span>{message.time}</span>

          {isMine && (
            <span>
              {message.status === 'sent' && <Check size={13} />}
              {message.status === 'delivered' && <CheckCheck size={13} />}
              {message.status === 'seen' && <CheckCheck size={13} color="#60a5fa" />}
            </span>
          )}
        </div>

        {/* Quick Reaction Emoji Toolbar Popover */}
        {showMenu && (
          <div
            style={{
              position: 'absolute',
              top: '-36px',
              right: isMine ? '0' : 'auto',
              left: isMine ? 'auto' : '0',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 10
            }}
            className="animate-pop"
          >
            {emojiOptions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => addReaction(message.id, emoji)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  padding: '2px',
                  transition: 'transform 0.15s ease'
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {emoji}
              </button>
            ))}

            <button
              onClick={() => setReplyToMessage(message)}
              title="Reply"
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
            >
              <Reply size={14} />
            </button>

            <button
              onClick={() => saveMessage(message)}
              title="Save Message"
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
            >
              <Bookmark size={14} />
            </button>

            <button
              onClick={() => pinMessage(message)}
              title="Pin Message"
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
            >
              <Pin size={14} />
            </button>

            {isMine && (
              <>
                <button
                  onClick={() => setEditingMessage(message)}
                  title="Edit"
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => deleteMessage(message.id)}
                  title="Delete"
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Applied Reactions Badges */}
      {message.reactions && message.reactions.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '4px',
            marginTop: '3px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1px 6px',
            fontSize: '0.72rem'
          }}
        >
          {message.reactions.map((r, idx) => (
            <span key={idx}>{r}</span>
          ))}
        </div>
      )}
    </div>
  );
};
