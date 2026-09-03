import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Monitor,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const CallModal = () => {
  const { activeCall, endCall } = useChat();

  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);

  useEffect(() => {
    let timer;
    if (activeCall) {
      setIsVideoOn(activeCall.type === 'video');
      setIsMuted(false);
      setIsScreenSharing(false);
      setIsSpeakerMuted(false);
      setDuration(0);

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
          width: '740px',
          height: '500px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Call Area (Video, Screen Share, or Audio Visualizer) */}
        <div
          style={{
            flex: 1,
            background: isScreenSharing
              ? 'linear-gradient(135deg, #090d16, #111827)'
              : isVideoOn
              ? 'linear-gradient(135deg, #111827, #1f2937)'
              : 'linear-gradient(135deg, #151923, #0f1117)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
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
              zIndex: 20
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', padding: '4px 12px', borderRadius: '999px', background: 'rgba(0,0,0,0.65)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {isScreenSharing ? '🖥️ Desktop Screen Sharing' : isVideoOn ? '📹 HD 1080p Video Call' : '🎙️ Encrypted Voice Call'}
              </span>
              {isMuted && (
                <span style={{ fontSize: '0.78rem', padding: '4px 10px', borderRadius: '999px', background: 'rgba(239, 68, 68, 0.3)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.5)', fontWeight: '600' }}>
                  Microphone Muted
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#fff', background: 'rgba(0,0,0,0.65)', padding: '4px 14px', borderRadius: '999px', backdropFilter: 'blur(8px)' }}>
              {formatTime(duration)}
            </span>
          </div>

          {/* Screen Sharing Screen Stream View */}
          {isScreenSharing ? (
            <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0b0f19', border: '1px solid var(--primary-glow)' }}>
              <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid var(--primary)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <Monitor size={48} color="var(--primary)" />
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff' }}>Sharing Screen with {activeCall.contact.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Live WebRTC Display Capture Active (1920x1080 @ 60fps)</p>
              </div>

              {/* PiP Video Thumbnail */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  width: '130px',
                  height: '85px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px solid var(--primary)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <img
                  src={activeCall.contact.avatar}
                  alt={activeCall.contact.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          ) : isVideoOn ? (
            /* HD Video Stream Grid Simulation */
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <img
                src={activeCall.contact.avatar}
                alt={activeCall.contact.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    background: isMuted ? 'rgba(239, 68, 68, 0.2)' : 'var(--primary-glow)',
                    animation: 'pulseGlow 2s infinite ease-in-out'
                  }}
                ></div>
                <img
                  src={activeCall.contact.avatar}
                  alt={activeCall.contact.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    position: 'relative',
                    border: isMuted ? '3px solid #ef4444' : '3px solid var(--primary)'
                  }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#ffffff' }}>
                  {activeCall.contact.name}
                </h3>
                <span style={{ fontSize: '0.85rem', color: isMuted ? '#ef4444' : '#22c55e', fontWeight: '600' }}>
                  {isMuted ? '🎙️ Mic Muted' : '🟢 Voice Call Connected'} • {formatTime(duration)}
                </span>
              </div>
            </div>
          )}
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
          {/* Mute Mic Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="btn"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isMuted ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              border: isMuted ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.2s ease'
            }}
            title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
          >
            {isMuted ? <MicOff size={20} color="#ef4444" /> : <Mic size={20} color="#ffffff" />}
          </button>

          {/* Camera Toggle Button */}
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="btn"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isVideoOn ? 'rgba(34, 197, 94, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              border: isVideoOn ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.2s ease'
            }}
            title={isVideoOn ? 'Turn Camera Off' : 'Turn Camera On'}
          >
            {isVideoOn ? <Video size={20} color="#22c55e" /> : <VideoOff size={20} color="#ef4444" />}
          </button>

          {/* Screen Share Button */}
          <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className="btn"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isScreenSharing ? 'var(--primary)' : 'rgba(255, 255, 255, 0.08)',
              border: isScreenSharing ? '1px solid var(--primary-glow)' : '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: isScreenSharing ? '0 0 16px var(--primary-glow)' : 'none',
              transition: 'all 0.2s ease'
            }}
            title={isScreenSharing ? 'Stop Screen Sharing' : 'Share Screen'}
          >
            <Monitor size={20} color="#ffffff" />
          </button>

          {/* Speaker Mute/Unmute */}
          <button
            onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
            className="btn"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isSpeakerMuted ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              border: isSpeakerMuted ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.2s ease'
            }}
            title={isSpeakerMuted ? 'Unmute Audio Speaker' : 'Mute Audio Speaker'}
          >
            {isSpeakerMuted ? <VolumeX size={20} color="#ef4444" /> : <Volume2 size={20} color="#ffffff" />}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
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
