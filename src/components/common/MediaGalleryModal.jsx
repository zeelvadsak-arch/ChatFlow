import React, { useState } from 'react';
import { X, Image, FileText, Link, Mic } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const MediaGalleryModal = () => {
  const { mediaGalleryChat, setMediaGalleryChat } = useChat();
  const [tab, setTab] = useState('photos');

  if (!mediaGalleryChat) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 115 }}>
      <div
        className="glass-panel animate-pop"
        style={{
          width: '540px',
          height: '420px',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Shared Media & Files
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>In chat with {mediaGalleryChat.name}</span>
          </div>
          <button onClick={() => setMediaGalleryChat(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
          {[
            { id: 'photos', label: 'Photos & Videos', icon: Image },
            { id: 'docs', label: 'Documents', icon: FileText },
            { id: 'links', label: 'Links', icon: Link }
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="btn"
                style={{
                  padding: '5px 12px',
                  fontSize: '0.8rem',
                  borderRadius: 'var(--radius-full)',
                  background: tab === t.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  color: tab === t.id ? '#fff' : 'var(--text-muted)'
                }}
              >
                <Icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {tab === 'photos' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
                alt="Shared 1"
                style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
                alt="Shared 2"
                style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          )}

          {tab === 'docs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <FileText size={20} color="var(--primary)" />
                <div>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: '600' }}>socket_architecture.pdf</h5>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>2.4 MB • Sent yesterday</span>
                </div>
              </div>
            </div>
          )}

          {tab === 'links' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <Link size={18} color="var(--secondary)" />
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer" style={{ fontSize: '0.84rem', color: '#a5b4fc', textDecoration: 'none' }}>
                  https://vitejs.dev/config/
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
