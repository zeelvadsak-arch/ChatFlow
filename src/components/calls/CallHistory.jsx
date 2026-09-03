import React, { useState } from 'react';
import { Phone, Video, PhoneIncoming, PhoneOutgoing, PhoneMissed, Play } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const CallHistory = () => {
  const { callHistory, initiateCall, contacts } = useChat();
  const [filter, setFilter] = useState('all'); // 'all', 'missed'

  const filteredCalls = callHistory.filter((call) => {
    if (filter === 'missed') return call.status === 'missed';
    return true;
  });

  return (
    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>Calls & WebRTC History</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Review incoming, outgoing, and missed voice/video connections</p>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['all', 'missed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="btn"
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-full)',
                background: filter === f ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: filter === f ? '#fff' : 'var(--text-muted)',
                textTransform: 'capitalize'
              }}
            >
              {f} Calls
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredCalls.map((call) => {
          const contact = contacts.find((c) => c.name === call.name) || {
            name: call.name,
            avatar: call.avatar,
            status: 'online'
          };

          return (
            <div
              key={call.id}
              className="glass-card"
              style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={call.avatar} alt={call.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>{call.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: call.status === 'missed' ? '#ef4444' : 'var(--text-muted)' }}>
                    {call.direction === 'incoming' && <PhoneIncoming size={13} color="#22c55e" />}
                    {call.direction === 'outgoing' && <PhoneOutgoing size={13} color="var(--primary)" />}
                    {call.direction === 'missed' && <PhoneMissed size={13} color="#ef4444" />}
                    <span>{call.time} • {call.duration}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => initiateCall(contact, 'voice')} className="btn-icon" title="Voice Redial">
                  <Phone size={17} />
                </button>
                <button onClick={() => initiateCall(contact, 'video')} className="btn-icon" title="Video Call">
                  <Video size={17} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
