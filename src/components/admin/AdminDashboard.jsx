import React, { useState } from 'react';
import {
  Shield,
  Users,
  MessageSquare,
  AlertTriangle,
  BarChart3,
  Megaphone,
  Key,
  FileText,
  HardDrive,
  Activity,
  LogOut,
  CheckCircle,
  Layers
} from 'lucide-react';
import { AdminLogin } from './AdminLogin';
import { AdminUserManagement } from './AdminUserManagement';
import { AdminMessageModeration } from './AdminMessageModeration';
import { AdminReportsQueue } from './AdminReportsQueue';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminAnnouncements } from './AdminAnnouncements';
import { AdminAuditLogs } from './AdminAuditLogs';
import { AdminPermissions } from './AdminPermissions';
import { AdminSettingsStorage } from './AdminSettingsStorage';

export const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState({
    name: 'Super Admin',
    email: 'admin@chatflow.com',
    role: 'super_admin' // 'super_admin', 'admin', 'moderator'
  });

  const [activeModule, setActiveModule] = useState('overview');

  if (!adminUser) {
    return <AdminLogin onLoginSuccess={(user) => setAdminUser(user)} />;
  }

  const modules = [
    { id: 'overview', label: 'Dashboard Overview', icon: Layers },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'messages', label: 'Message Moderation', icon: MessageSquare },
    { id: 'reports', label: 'Reports Queue', icon: AlertTriangle, badge: 2 },
    { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'permissions', label: 'Permission Matrix', icon: Key },
    { id: 'audit', label: 'Audit Logs', icon: FileText },
    { id: 'storage', label: 'Settings & Storage', icon: HardDrive }
  ];

  return (
    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      {/* Top Admin Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={22} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>ChatFlow Enterprise Admin Suite</h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Role-Based Platform Control & Moderation System</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '999px', background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.25)', fontWeight: '600' }}>
            ● Socket Engine Connected (5,120 Sockets)
          </span>

          <span style={{ fontSize: '0.78rem', padding: '4px 12px', borderRadius: '999px', background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc', fontWeight: '600' }}>
            Role: {adminUser.role === 'super_admin' ? '⚡ Super Admin' : adminUser.role === 'admin' ? '🛡️ Admin' : '👁️ Moderator'}
          </span>
        </div>
      </div>

      {/* Module Navigation Ribbon */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px' }}>
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = activeModule === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className="btn"
              style={{
                padding: '7px 14px',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-full)',
                background: isActive ? 'var(--secondary)' : 'rgba(255,255,255,0.04)',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontWeight: isActive ? '600' : '500',
                flexShrink: 0
              }}
            >
              <Icon size={15} />
              {m.label}
              {m.badge > 0 && (
                <span className="badge" style={{ background: '#ef4444', fontSize: '0.68rem', padding: '1px 5px' }}>
                  {m.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Module View Content */}
      {activeModule === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Key Admin Statistics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div className="glass-card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Users</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '4px', color: 'var(--text-main)' }}>25,430</h3>
              <span style={{ fontSize: '0.72rem', color: '#22c55e' }}>4,280 Online right now</span>
            </div>
            <div className="glass-card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Messages</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '4px', color: 'var(--text-main)' }}>1,250,620</h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>85,620 Messages today</span>
            </div>
            <div className="glass-card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Groups</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '4px', color: 'var(--text-main)' }}>920</h3>
              <span style={{ fontSize: '0.72rem', color: '#22c55e' }}>210 Active channels</span>
            </div>
            <div className="glass-card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pending Reports</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '4px', color: '#ef4444' }}>42</h3>
              <span style={{ fontSize: '0.72rem', color: '#ef4444' }}>Requires review</span>
            </div>
          </div>

          <AdminAnalytics />
        </div>
      )}

      {activeModule === 'users' && <AdminUserManagement />}
      {activeModule === 'messages' && <AdminMessageModeration />}
      {activeModule === 'reports' && <AdminReportsQueue />}
      {activeModule === 'analytics' && <AdminAnalytics />}
      {activeModule === 'announcements' && <AdminAnnouncements />}
      {activeModule === 'permissions' && <AdminPermissions />}
      {activeModule === 'audit' && <AdminAuditLogs />}
      {activeModule === 'storage' && <AdminSettingsStorage />}
    </div>
  );
};
