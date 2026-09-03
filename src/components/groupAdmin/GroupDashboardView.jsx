import React from 'react';
import { Users, MessageSquare, UserCheck, Shield, AlertTriangle, Activity, Megaphone } from 'lucide-react';

export const GroupDashboardView = ({ group, setActiveTab }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      {/* Welcome Banner */}
      <div
        style={{
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(99, 102, 241, 0.15))',
          border: '1px solid var(--secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.78rem', padding: '3px 8px', borderRadius: '999px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', fontWeight: '600' }}>
              👑 Role: Group Owner & Admin
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>
            {group.name} — Management Hub
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Channel moderation, member role assignments, join requests, and permission controls
          </p>
        </div>

        <button onClick={() => setActiveTab('members')} className="btn btn-primary" style={{ background: 'var(--secondary)' }}>
          <Users size={16} /> Manage Members (250)
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Members</span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2px' }}>250</h3>
          <span style={{ fontSize: '0.72rem', color: '#22c55e' }}>48 Online right now</span>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Messages Today</span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2px' }}>1,240</h3>
          <span style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>Peak: 40 msgs/hr</span>
        </div>

        <div onClick={() => setActiveTab('requests')} className="glass-card" style={{ padding: '16px', cursor: 'pointer' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Pending Requests</span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2px', color: '#eab308' }}>12</h3>
          <span style={{ fontSize: '0.72rem', color: '#eab308' }}>Requires admin review</span>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Group Admins</span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2px', color: '#c084fc' }}>4</h3>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>2 Moderators</span>
        </div>
      </div>

      {/* Active Group Announcement */}
      {group.announcement && (
        <div className="glass-card" style={{ padding: '16px', borderLeft: '4px solid var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Megaphone size={14} /> Active Group Announcement
            </span>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '4px' }}>
              {group.announcement}
            </p>
          </div>
          <button onClick={() => setActiveTab('announcements')} className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
            Edit Banner
          </button>
        </div>
      )}
    </div>
  );
};
