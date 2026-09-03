import React, { useState } from 'react';
import { Flag, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';

export const AdminReportsQueue = () => {
  const [reports, setReports] = useState([
    { id: 'rep_101', target: 'Krish Patel', type: 'User', reporter: 'Priya Joshi', reason: 'Spam Messages', time: '10 min ago', status: 'pending' },
    { id: 'rep_102', target: 'React Developers Group', type: 'Group', reporter: 'Jay Varma', reason: 'Inappropriate Content', time: '1 hour ago', status: 'under_review' },
    { id: 'rep_103', target: 'Rahul Sharma', type: 'User', reporter: 'Anand Patel', reason: 'Abuse', time: 'Yesterday', status: 'resolved' }
  ]);

  const [activeTab, setActiveTab] = useState('pending');

  const filteredReports = reports.filter((r) => r.status === activeTab);

  const resolveReport = (id, newStatus) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade">
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
          🚨 Reports Management Queue
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Review user, message, and group violation reports submitted by the community
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        {['pending', 'under_review', 'resolved', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="btn"
            style={{
              padding: '6px 14px',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-full)',
              background: activeTab === tab ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: activeTab === tab ? '#fff' : 'var(--text-muted)',
              textTransform: 'capitalize'
            }}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredReports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            No reports in {activeTab} status
          </div>
        ) : (
          filteredReports.map((r) => (
            <div key={r.id} className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Flag size={20} color="#ef4444" />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>Target: {r.target} ({r.type})</h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Reason: {r.reason} • Reported by {r.reporter} ({r.time})
                  </span>
                </div>
              </div>

              {r.status === 'pending' || r.status === 'under_review' ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => resolveReport(r.id, 'resolved')} className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                    Resolve & Action
                  </button>
                  <button onClick={() => resolveReport(r.id, 'rejected')} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                    Reject Report
                  </button>
                </div>
              ) : (
                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: r.status === 'resolved' ? '#22c55e' : 'var(--text-dim)' }}>
                  Status: {r.status.toUpperCase()}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
