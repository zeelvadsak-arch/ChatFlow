import React, { useState } from 'react';
import {
  X,
  Users,
  MessageSquare,
  UserCheck,
  Megaphone,
  Key,
  Settings,
  Activity,
  Shield,
  Layers
} from 'lucide-react';
import { GroupDashboardView } from './GroupDashboardView';
import { GroupMembersView } from './GroupMembersView';
import { GroupJoinRequests } from './GroupJoinRequests';
import { GroupAnnouncementsView } from './GroupAnnouncementsView';
import { GroupPermissionsView } from './GroupPermissionsView';
import { GroupSettingsView } from './GroupSettingsView';
import { GroupActivityLog } from './GroupActivityLog';

export const GroupAdminModal = ({ group, onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!group) return null;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'requests', label: 'Join Requests', icon: UserCheck, badge: 12 },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'permissions', label: 'Permissions', icon: Key },
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="modal-overlay" style={{ zIndex: 120 }}>
      <div
        className="glass-panel animate-pop"
        style={{
          width: '840px',
          height: '560px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Top Header */}
        <div
          style={{
            padding: '16px 24px',
            background: 'var(--bg-sidebar)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={group.avatar} alt={group.name} style={{ width: '40px', height: '40px', borderRadius: '12px', objectFit: 'cover' }} />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
                {group.name} — Group Admin Panel
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: '600' }}>
                Channel Management Workspace
              </span>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Ribbon Navigation */}
        <div style={{ display: 'flex', gap: '4px', padding: '10px 20px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', overflowX: 'auto' }}>
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="btn"
                style={{
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'var(--secondary)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  fontWeight: isActive ? '600' : '500',
                  flexShrink: 0
                }}
              >
                <Icon size={14} />
                {t.label}
                {t.badge > 0 && (
                  <span className="badge" style={{ background: '#eab308', color: '#000', fontSize: '0.68rem', padding: '1px 5px' }}>
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* View Workspace */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {activeTab === 'dashboard' && <GroupDashboardView group={group} setActiveTab={setActiveTab} />}
          {activeTab === 'members' && <GroupMembersView />}
          {activeTab === 'requests' && <GroupJoinRequests />}
          {activeTab === 'announcements' && <GroupAnnouncementsView group={group} />}
          {activeTab === 'permissions' && <GroupPermissionsView />}
          {activeTab === 'activity' && <GroupActivityLog />}
          {activeTab === 'settings' && <GroupSettingsView group={group} />}
        </div>
      </div>
    </div>
  );
};
