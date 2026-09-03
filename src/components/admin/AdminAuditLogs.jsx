import React, { useState } from 'react';
import { ShieldCheck, Search, FileText } from 'lucide-react';

export const AdminAuditLogs = () => {
  const [logs] = useState([
    { id: 'l1', admin: 'Admin01 (Super Admin)', action: 'Suspended User (7 days)', target: 'Rahul Sharma', reason: 'Spam Activity', time: '10:20 AM' },
    { id: 'l2', admin: 'Admin01 (Super Admin)', action: 'Deleted Group Channel', target: 'Unwanted Group', reason: 'Inappropriate Content', time: '10:25 AM' },
    { id: 'l3', admin: 'Admin02 (Moderator)', action: 'Resolved Report #52', target: 'Reported Message #gm3', reason: 'Message Kept', time: '10:31 AM' },
    { id: 'l4', admin: 'Super Admin', action: 'Published Announcement', target: 'All Users', reason: 'System Update v2.4', time: 'Yesterday 4:00 PM' }
  ]);

  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter(
    (l) =>
      l.admin.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.target.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
            📝 Admin Audit Logs
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Immutable record of all administrator actions, moderation decisions, and system setting changes
          </p>
        </div>

        <div style={{ position: 'relative', width: '240px' }}>
          <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search audit logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '36px', height: '34px', fontSize: '0.8rem' }}
          />
        </div>
      </div>

      <div className="glass-card" style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px' }}>Admin</th>
              <th style={{ padding: '12px 16px' }}>Action Taken</th>
              <th style={{ padding: '12px 16px' }}>Target Entity</th>
              <th style={{ padding: '12px 16px' }}>Reason / Details</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px', fontWeight: '600', color: '#c084fc' }}>{log.admin}</td>
                <td style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--text-main)' }}>{log.action}</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)' }}>{log.target}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{log.reason}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--text-dim)' }}>{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
