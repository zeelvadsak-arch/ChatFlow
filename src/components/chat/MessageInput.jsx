import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Smile,
  Mic,
  Image as ImageIcon,
  FileText,
  Music,
  Folder,
  User,
  MapPin,
  X,
  File
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const MessageInput = () => {
  const {
    sendMessage,
    replyToMessage,
    setReplyToMessage,
    editingMessage,
    setEditingMessage,
    contacts
  } = useChat();

  const [text, setText] = useState('');
  const [pendingAttachments, setPendingAttachments] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showContactPicker, setShowContactPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const timerRef = useRef(null);

  // Hidden File Input References
  const documentInputRef = useRef(null);
  const mediaInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const anyFileInputRef = useRef(null);

  useEffect(() => {
    if (editingMessage) {
      setText(editingMessage.text || '');
    }
  }, [editingMessage]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordSeconds(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const handleSend = () => {
    if (!text.trim() && pendingAttachments.length === 0) return;
    sendMessage(text, pendingAttachments);
    setText('');
    setPendingAttachments([]);
    setShowEmojiPicker(false);
    setShowAttachMenu(false);
    setShowContactPicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle Real File Selection into Pending Preview State
  const handleFileSelect = (e, defaultType = 'file') => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    const newAttachments = files.map((file) => {
      let type = defaultType;
      if (file.type.startsWith('image/')) type = 'image';
      else if (file.type.startsWith('video/')) type = 'video';
      else if (file.type.startsWith('audio/')) type = 'audio';
      else if (file.type.includes('pdf') || file.name.toLowerCase().endsWith('.pdf')) type = 'pdf';
      else type = 'file';

      const url = URL.createObjectURL(file);
      const sizeBytes = file.size;
      const sizeStr = sizeBytes > 1024 * 1024
        ? (sizeBytes / (1024 * 1024)).toFixed(1) + ' MB'
        : (sizeBytes / 1024).toFixed(1) + ' KB';

      return {
        id: 'att_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        type,
        url,
        title: file.name,
        size: sizeStr
      };
    });

    setPendingAttachments((prev) => [...prev, ...newAttachments]);
    setShowAttachMenu(false);
    e.target.value = '';
  };

  const removePendingAttachment = (id) => {
    setPendingAttachments((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSendContact = (contact) => {
    const newContactAtt = {
      id: 'att_c_' + Date.now(),
      type: 'contact',
      name: contact.name,
      username: contact.username,
      avatar: contact.avatar
    };
    setPendingAttachments((prev) => [...prev, newContactAtt]);
    setShowContactPicker(false);
    setShowAttachMenu(false);
  };

  const handleSendLocation = () => {
    const newLocAtt = {
      id: 'att_loc_' + Date.now(),
      type: 'location',
      title: 'Ahmedabad, Gujarat, India (Live Location)',
      url: 'https://maps.google.com'
    };
    setPendingAttachments((prev) => [...prev, newLocAtt]);
    setShowAttachMenu(false);
  };

  const stopAndSendVoice = () => {
    setIsRecording(false);
    sendMessage('', [], 'voice_sample.mp3');
  };

  const commonEmojis = ['😊', '😂', '👍', '🔥', '🚀', '❤️', '🙌', '🎉', '👋', '💯', '✨', '😍', '😎', '👏'];

  const canSend = text.trim().length > 0 || pendingAttachments.length > 0;

  return (
    <div
      style={{
        padding: '12px 20px',
        background: 'var(--bg-sidebar)',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        position: 'relative'
      }}
    >
      {/* Hidden Native File Inputs */}
      <input
        type="file"
        ref={documentInputRef}
        onChange={(e) => handleFileSelect(e, 'pdf')}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.csv,.json"
        multiple
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={mediaInputRef}
        onChange={(e) => handleFileSelect(e, 'image')}
        accept="image/*,video/*"
        multiple
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={audioInputRef}
        onChange={(e) => handleFileSelect(e, 'audio')}
        accept="audio/*"
        multiple
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={anyFileInputRef}
        onChange={(e) => handleFileSelect(e, 'file')}
        multiple
        style={{ display: 'none' }}
      />

      {/* Reply or Edit Banner */}
      {(replyToMessage || editingMessage) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-card)',
            borderLeft: '3px solid var(--primary)',
            fontSize: '0.82rem'
          }}
          className="animate-pop"
        >
          <div>
            <span style={{ fontWeight: '600', color: 'var(--primary)', display: 'block' }}>
              {editingMessage ? 'Editing Message' : `Replying to ${replyToMessage.senderName}`}
            </span>
            <span style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {editingMessage ? editingMessage.text : replyToMessage.text}
            </span>
          </div>

          <button
            onClick={() => {
              setReplyToMessage(null);
              setEditingMessage(null);
              setText('');
            }}
            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Pending Attachments Preview Banner */}
      {pendingAttachments.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '10px',
            padding: '10px',
            background: 'var(--bg-card)',
            border: '1px dashed var(--primary)',
            borderRadius: 'var(--radius-md)',
            overflowX: 'auto',
            alignItems: 'center'
          }}
          className="animate-pop"
        >
          <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--primary)', flexShrink: 0 }}>
            Attached ({pendingAttachments.length}):
          </span>

          {pendingAttachments.map((att) => (
            <div
              key={att.id}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 10px',
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid var(--primary-glow)',
                borderRadius: '8px',
                fontSize: '0.8rem',
                flexShrink: 0,
                maxWidth: '200px'
              }}
            >
              {att.type === 'image' && (
                <img src={att.url} alt={att.title} style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />
              )}
              {(att.type === 'pdf' || att.type === 'file') && (
                <FileText size={20} color="var(--primary)" />
              )}
              {att.type === 'audio' && (
                <Music size={20} color="#f97316" />
              )}
              {att.type === 'contact' && (
                <img src={att.avatar} alt={att.name} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
              )}
              {att.type === 'location' && (
                <MapPin size={20} color="#10b981" />
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontWeight: '600', color: 'var(--text-main)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {att.title || att.name}
                </span>
                {att.size && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{att.size}</span>}
              </div>

              <button
                onClick={() => removePendingAttachment(att.id)}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: 'none',
                  color: '#f87171',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                title="Remove attachment"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Voice Recorder Active Bar */}
      {isRecording ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}
          className="animate-pop"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} className="animate-pulse"></span>
            <span style={{ fontWeight: '600', color: '#f87171', fontSize: '0.85rem' }}>
              Recording Voice... 0:0{recordSeconds}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsRecording(false)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              Cancel
            </button>
            <button onClick={stopAndSendVoice} className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem', gap: '4px' }}>
              <Send size={14} /> Send Voice
            </button>
          </div>
        </div>
      ) : (
        /* Regular Input Controls */
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
          
          {/* WhatsApp Style Attachment Menu Grid Popup */}
          {showAttachMenu && (
            <div
              style={{
                position: 'absolute',
                bottom: '56px',
                left: '0',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '14px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                width: '280px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                zIndex: 40
              }}
              className="animate-pop"
            >
              {/* Document / PDF */}
              <button
                onClick={() => documentInputRef.current?.click()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-main)'
                }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)' }}>
                  <FileText size={22} color="#ffffff" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Document / PDF</span>
              </button>

              {/* Photos & Videos */}
              <button
                onClick={() => mediaInputRef.current?.click()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-main)'
                }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)' }}>
                  <ImageIcon size={22} color="#ffffff" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Photos & Videos</span>
              </button>

              {/* Audio / Music */}
              <button
                onClick={() => audioInputRef.current?.click()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-main)'
                }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)' }}>
                  <Music size={22} color="#ffffff" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Audio File</span>
              </button>

              {/* Folder / All Files */}
              <button
                onClick={() => anyFileInputRef.current?.click()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-main)'
                }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
                  <Folder size={22} color="#ffffff" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Files / Folder</span>
              </button>

              {/* Contact Card */}
              <button
                onClick={() => setShowContactPicker(!showContactPicker)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-main)'
                }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)' }}>
                  <User size={22} color="#ffffff" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Contact</span>
              </button>

              {/* Location */}
              <button
                onClick={handleSendLocation}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-main)'
                }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>
                  <MapPin size={22} color="#ffffff" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Location</span>
              </button>
            </div>
          )}

          {/* Contact Selector Popup */}
          {showContactPicker && (
            <div
              style={{
                position: 'absolute',
                bottom: '60px',
                left: '60px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px',
                width: '220px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 50
              }}
              className="animate-pop"
            >
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                Share Contact
              </span>
              {contacts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSendContact(c)}
                  className="btn btn-secondary"
                  style={{ justifyContent: 'flex-start', fontSize: '0.82rem', padding: '6px 8px', gap: '8px' }}
                >
                  <img src={c.avatar} alt={c.name} style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Emoji Picker Popup */}
          {showEmojiPicker && (
            <div
              style={{
                position: 'absolute',
                bottom: '52px',
                left: '40px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px',
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '6px',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 40
              }}
              className="animate-pop"
            >
              {commonEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setText((prev) => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px'
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Attach Button */}
          <button
            onClick={() => {
              setShowAttachMenu(!showAttachMenu);
              setShowEmojiPicker(false);
              setShowContactPicker(false);
            }}
            className={`btn-icon ${showAttachMenu ? 'active' : ''}`}
            title="Attach File / Document / Media"
          >
            <Paperclip size={18} />
          </button>

          {/* Emoji Button */}
          <button
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
              setShowAttachMenu(false);
              setShowContactPicker(false);
            }}
            className={`btn-icon ${showEmojiPicker ? 'active' : ''}`}
            title="Emoji"
          >
            <Smile size={18} />
          </button>

          {/* Main Input Field */}
          <input
            type="text"
            placeholder={editingMessage ? 'Edit your message...' : 'Type a message...'}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-field"
            style={{ flex: 1, height: '42px', fontSize: '0.9rem', borderRadius: 'var(--radius-full)' }}
          />

          {/* Send Button or Voice Record Toggle */}
          {canSend ? (
            <button
              onClick={handleSend}
              className="btn btn-primary"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                padding: 0,
                flexShrink: 0
              }}
              title="Send message with attachments"
            >
              <Send size={18} />
            </button>
          ) : (
            <button
              onClick={() => setIsRecording(true)}
              className="btn-icon"
              style={{
                width: '42px',
                height: '42px',
                background: 'rgba(99, 102, 241, 0.12)',
                color: 'var(--primary)',
                flexShrink: 0
              }}
              title="Voice note"
            >
              <Mic size={19} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
