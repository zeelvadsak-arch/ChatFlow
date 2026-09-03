import React from 'react';
import { Activity, Shield } from 'lucide-react';

export const GroupActivityLog = () => {
  const logs = [
    { id: 'gl1', admin: 'Admin Rahul', action: 'Promoted Jay → Moderator', time: '10:30 AM' },
    { id: 'gl2', admin: 'Admin Rahul', action: 'Removed member Amit', time: '11:15 AM' },
    { id: 'gl3', admin: 'Moderator Krish', action: 'Deleted spam message', time: '12:05 PM' },
    { id: 'gl4', admin: 'Owner Anand', action: 'Updated Group Announcement', time: 'Yesterday 4:00 PM' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade">
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
          📝 Group Activity & Audit Logs
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Immutable log of all group admin and moderator interventions in this channel
        </p>
      </div>

      <div className="glass-card" style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px' }}>Group Admin</th>
              <th style={{ padding: '12px 16px' }}>Action Executed</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--secondary)' }}>{l.admin}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-main)' }}>{l.action}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--text-dim)' }}>{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
