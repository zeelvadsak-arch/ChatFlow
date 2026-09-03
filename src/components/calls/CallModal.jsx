import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Monitor,
  Volume2,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const CallModal = () => {
  const { activeCall, endCall } = useChat();

  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(activeCall?.type === 'video');
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  useEffect(() => {
    let timer;
    if (activeCall) {
      timer = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeCall]);

  if (!activeCall) return null;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 200 }}>
      <div
        className="glass-panel animate-pop"
        style={{
          width: '720px',
          height: '480px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Call Area (Video or Audio Visualizer) */}
        <div
          style={{
            flex: 1,
            background: isVideoOn
              ? 'linear-gradient(135deg, #111827, #1f2937)'
              : 'linear-gradient(135deg, #151923, #0f1117)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {isVideoOn ? (
            /* Video Mesh Grid Simulation */
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <img
                src={activeCall.contact.avatar}
                alt={activeCall.contact.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />

              {/* Local Video Thumbnail Picture-in-Picture */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  width: '140px',
                  height: '95px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px solid var(--primary)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="You"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          ) : (
            /* Voice Calling Pulse Audio Visualizer */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    background: 'var(--primary-glow)',
                    animation: 'pulseGlow 2s infinite ease-in-out'
                  }}
                ></div>
                <img
                  src={activeCall.contact.avatar}
                  alt={activeCall.contact.name}
                  style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', position: 'relative', border: '3px solid var(--primary)' }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#ffffff' }}>
                  {activeCall.contact.name}
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#22c55e', fontWeight: '600' }}>
                  WebRTC Voice Call • {formatTime(duration)}
                </span>
              </div>
            </div>
          )}

          {/* Top Bar inside Call Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              right: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10
            }}
          >
            <span style={{ fontSize: '0.82rem', padding: '4px 12px', borderRadius: '999px', background: 'rgba(0,0,0,0.6)', color: '#fff' }}>
              {activeCall.type === 'video' ? '📹 HD 1080p Video' : '🎙️ Encrypted Voice'}
            </span>
            <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '999px' }}>
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Bottom Control Dock */}
        <div
          style={{
            padding: '16px 24px',
            background: 'rgba(15, 17, 23, 0.95)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px'
          }}
        >
          {/* Mute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`btn-icon ${isMuted ? 'active' : ''}`}
            style={{ width: '48px', height: '48px' }}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff size={20} color="#ef4444" /> : <Mic size={20} />}
          </button>

          {/* Camera Toggle */}
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`btn-icon ${!isVideoOn ? 'active' : ''}`}
            style={{ width: '48px', height: '48px' }}
            title={isVideoOn ? 'Turn Camera Off' : 'Turn Camera On'}
          >
            {isVideoOn ? <Video size={20} /> : <VideoOff size={20} color="#ef4444" />}
          </button>

          {/* Screen Share */}
          <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`btn-icon ${isScreenSharing ? 'active' : ''}`}
            style={{ width: '48px', height: '48px' }}
            title="Screen Share"
          >
            <Monitor size={20} color={isScreenSharing ? 'var(--primary)' : 'currentColor'} />
          </button>

          {/* End Call Button */}
          <button
            onClick={endCall}
            className="btn btn-danger"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              padding: 0,
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)'
            }}
            title="End Call"
          >
            <PhoneOff size={24} color="#ffffff" />
          </button>
        </div>
      </div>
    </div>
  );
};
