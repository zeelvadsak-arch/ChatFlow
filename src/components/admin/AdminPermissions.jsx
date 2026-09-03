import React from 'react';
import { Shield, Check, X, Eye } from 'lucide-react';

export const AdminPermissions = () => {
  const permissionsMatrix = [
    { feature: 'User Management (View & Search)', superAdmin: true, admin: true, moderator: 'view' },
    { feature: 'Block & Suspend User Accounts', superAdmin: true, admin: true, moderator: false },
    { feature: 'Delete User Account Permanently', superAdmin: true, admin: false, moderator: false },
    { feature: 'Group Management & Moderation', superAdmin: true, admin: true, moderator: 'view' },
    { feature: 'Review Reports Queue', superAdmin: true, admin: true, moderator: true },
    { feature: 'Delete Flagged Message', superAdmin: true, admin: true, moderator: true },
    { feature: 'Platform Analytics & Growth', superAdmin: true, admin: true, moderator: false },
    { feature: 'Publish Broadcast Announcements', superAdmin: true, admin: true, moderator: false },
    { feature: 'Admin Accounts Management', superAdmin: true, admin: false, moderator: false },
    { feature: 'System & Storage Settings', superAdmin: true, admin: false, moderator: false }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade">
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
          🔑 Role-Based Access Control (RBAC) Permission Matrix
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Enforced permissions matrix for Super Admin, Admin, and Moderator access levels
        </p>
      </div>

      <div className="glass-card" style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '14px 18px', color: 'var(--text-main)' }}>Platform Permission</th>
              <th style={{ padding: '14px 18px', color: '#c084fc', textAlign: 'center' }}>⚡ Super Admin</th>
              <th style={{ padding: '14px 18px', color: 'var(--primary)', textAlign: 'center' }}>🛡️ Admin</th>
              <th style={{ padding: '14px 18px', color: '#eab308', textAlign: 'center' }}>👁️ Moderator</th>
            </tr>
          </thead>
          <tbody>
            {permissionsMatrix.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 18px', fontWeight: '600', color: 'var(--text-main)' }}>{row.feature}</td>
                <td style={{ padding: '12px 18px', textAlign: 'center' }}>
                  <Check size={18} color="#22c55e" style={{ margin: '0 auto' }} />
                </td>
                <td style={{ padding: '12px 18px', textAlign: 'center' }}>
                  {row.admin ? <Check size={18} color="#22c55e" style={{ margin: '0 auto' }} /> : <X size={18} color="#ef4444" style={{ margin: '0 auto' }} />}
                </td>
                <td style={{ padding: '12px 18px', textAlign: 'center' }}>
                  {row.moderator === true ? (
                    <Check size={18} color="#22c55e" style={{ margin: '0 auto' }} />
                  ) : row.moderator === 'view' ? (
                    <span style={{ fontSize: '0.75rem', color: '#eab308', fontWeight: '600' }}>👁️ View Only</span>
                  ) : (
                    <X size={18} color="#ef4444" style={{ margin: '0 auto' }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
