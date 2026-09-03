import React, { useState } from 'react';
import { MessageSquare, AlertTriangle, ShieldCheck, Trash2, CheckCircle2, UserX } from 'lucide-react';

export const AdminMessageModeration = () => {
  const [flaggedMessages, setFlaggedMessages] = useState([
    {
      id: 'msg_f1',
      sender: 'Krish Patel',
      recipient: 'Priya Joshi',
      text: 'Click this unknown external link immediately http://scam-link.xyz to claim free coins!',
      reason: 'Spam & Scam Link',
      reporter: 'Priya Joshi',
      time: '15 minutes ago',
      status: 'pending'
    },
    {
      id: 'msg_f2',
      sender: 'Neha Mehta',
      recipient: 'React Developers Group',
      text: 'Unwanted promotional text repeated multiple times in group channel',
      reason: 'Harassment / Group Abuse',
      reporter: 'Rahul Sharma',
      time: '1 hour ago',
      status: 'pending'
    }
  ]);

  const handleAction = (msgId, action) => {
    setFlaggedMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, status: action } : m))
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade">
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
          Message Moderation & Flagged Content Queue
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Review user-reported messages and take moderation decisions
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {flaggedMessages.map((item) => (
          <div key={item.id} className="glass-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} color="#ef4444" />
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#f87171' }}>
                  Reported Reason: {item.reason}
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                Reported by {item.reporter} • {item.time}
              </span>
            </div>

            <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid #ef4444', fontSize: '0.88rem', color: '#ffffff' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: '600', display: 'block', marginBottom: '2px' }}>
                Sender: {item.sender} ➔ Target: {item.recipient}
              </span>
              "{item.text}"
            </div>

            {item.status === 'pending' ? (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                <button onClick={() => handleAction(item.id, 'kept')} className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>
                  <CheckCircle2 size={14} color="#22c55e" /> Keep Message
                </button>
                <button onClick={() => handleAction(item.id, 'warned')} className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '6px 12px', color: '#eab308' }}>
                  Warn User
                </button>
                <button onClick={() => handleAction(item.id, 'deleted')} className="btn btn-danger" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>
                  <Trash2 size={14} /> Delete Content
                </button>
              </div>
            ) : (
              <div style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: '0.78rem', fontWeight: '600' }}>
                ✓ Decision Actioned: {item.status.toUpperCase()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
