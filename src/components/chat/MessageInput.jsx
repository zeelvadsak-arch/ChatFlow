import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Smile,
  Mic,
  Image,
  File,
  X,
  StopCircle,
  Play,
  Check
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const MessageInput = () => {
  const {
    sendMessage,
    replyToMessage,
    setReplyToMessage,
    editingMessage,
    setEditingMessage
  } = useChat();

  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const timerRef = useRef(null);

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
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
    setShowEmojiPicker(false);
    setShowAttachMenu(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSendImageMock = () => {
    sendMessage('', [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        title: 'design_system_preview.png'
      }
    ]);
    setShowAttachMenu(false);
  };

  const handleSendDocumentMock = () => {
    sendMessage('', [
      {
        type: 'file',
        title: 'chatflow_requirements_v2.pdf'
      }
    ]);
    setShowAttachMenu(false);
  };

  const stopAndSendVoice = () => {
    setIsRecording(false);
    sendMessage('', [], 'voice_sample.mp3');
  };

  const commonEmojis = ['😊', '😂', '👍', '🔥', '🚀', '❤️', '🙌', '🎉', '👋', '💯', '✨', '😍', '😎', '👏'];

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
          {/* Attachment Menu Popup */}
          {showAttachMenu && (
            <div
              style={{
                position: 'absolute',
                bottom: '52px',
                left: '0',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 20
              }}
              className="animate-pop"
            >
              <button
                onClick={handleSendImageMock}
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', fontSize: '0.82rem', padding: '6px 12px' }}
              >
                <Image size={16} color="var(--primary)" /> Send Photo / Video
              </button>
              <button
                onClick={handleSendDocumentMock}
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', fontSize: '0.82rem', padding: '6px 12px' }}
              >
                <File size={16} color="var(--secondary)" /> Send Document
              </button>
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
                zIndex: 20
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
            }}
            className={`btn-icon ${showAttachMenu ? 'active' : ''}`}
            title="Attach file"
          >
            <Paperclip size={18} />
          </button>

          {/* Emoji Button */}
          <button
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
              setShowAttachMenu(false);
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

          {/* Voice Record Toggle or Send Button */}
          {text.trim() ? (
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
              title="Send message"
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
