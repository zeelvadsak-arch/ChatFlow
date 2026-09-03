import React, { useState } from 'react';
import { UserCheck, Check, X } from 'lucide-react';

export const GroupJoinRequests = () => {
  const [requests, setRequests] = useState([
    { id: 'r1', name: 'Neha Mehta', note: 'Hey, I want to join the React Developer discussions.', time: '12 min ago', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
    { id: 'r2', name: 'Amit Shah', note: 'Senior Frontend Dev working with Redux & Vite.', time: '45 min ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
  ]);

  const handleDecision = (reqId, action) => {
    setRequests((prev) => prev.filter((r) => r.id !== reqId));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade">
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
          📩 Pending Join Requests ({requests.length})
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Private channel entry requests awaiting group admin approval
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            No pending join requests
          </div>
        ) : (
          requests.map((r) => (
            <div key={r.id} className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={r.avatar} alt={r.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{r.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>"{r.note}"</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleDecision(r.id, 'accept')} className="btn btn-primary" style={{ fontSize: '0.78rem', padding: '6px 12px', gap: '4px' }}>
                  <Check size={14} /> Accept Request
                </button>
                <button onClick={() => handleDecision(r.id, 'reject')} className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>
                  <X size={14} /> Decline
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
