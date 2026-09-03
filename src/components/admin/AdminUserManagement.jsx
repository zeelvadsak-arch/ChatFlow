import React, { useState } from 'react';
import { Search, Ban, Shield, ShieldCheck, UserCheck, AlertTriangle, X, Check, Trash2, Edit } from 'lucide-react';

export const AdminUserManagement = () => {
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Rahul Sharma', email: 'rahul@chatflow.com', status: 'Active', role: 'User', joined: '2026-01-12', msgs: 1420, groups: 12, reports: 0, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
    { id: 'u2', name: 'Jay Varma', email: 'jay@chatflow.com', status: 'Online', role: 'User', joined: '2026-02-01', msgs: 980, groups: 8, reports: 0, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { id: 'u3', name: 'Krish Patel', email: 'krish@chatflow.com', status: 'Blocked', role: 'User', joined: '2026-02-15', msgs: 450, groups: 4, reports: 2, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { id: 'u4', name: 'Neha Mehta', email: 'neha@chatflow.com', status: 'Suspended', role: 'User', joined: '2026-03-01', msgs: 210, groups: 2, reports: 4, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
    { id: 'u5', name: 'Anand Patel (Super Admin)', email: 'admin@chatflow.com', status: 'Active', role: 'Super Admin', joined: '2025-12-01', msgs: 8900, groups: 25, reports: 0, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
  ]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [suspendModalUser, setSuspendModalUser] = useState(null);
  const [suspendReason, setSuspendReason] = useState('Spam Activity');
  const [suspendDuration, setSuspendDuration] = useState('7 days');

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;
    if (statusFilter === 'active') return u.status === 'Active' || u.status === 'Online';
    if (statusFilter === 'blocked') return u.status === 'Blocked';
    if (statusFilter === 'suspended') return u.status === 'Suspended';
    return true;
  });

  const toggleBlock = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'Blocked' ? 'Active' : 'Blocked';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const handleSuspendSubmit = (e) => {
    e.preventDefault();
    if (!suspendModalUser) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === suspendModalUser.id ? { ...u, status: 'Suspended' } : u))
    );
    setSuspendModalUser(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade">
      {/* Search & Filter Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '36px', height: '36px', fontSize: '0.82rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['all', 'active', 'blocked', 'suspended'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className="btn"
              style={{
                padding: '5px 12px',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-full)',
                background: statusFilter === tab ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: statusFilter === tab ? '#fff' : 'var(--text-muted)',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Users Table */}
      <div className="glass-card" style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px' }}>User</th>
              <th style={{ padding: '12px 16px' }}>Email</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Role</th>
              <th style={{ padding: '12px 16px' }}>Reports</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={user.avatar} alt={user.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{user.name}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{user.email}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span
                    style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: '600',
                      background:
                        user.status === 'Active' || user.status === 'Online'
                          ? 'rgba(34, 197, 94, 0.15)'
                          : user.status === 'Blocked'
                          ? 'rgba(239, 68, 68, 0.15)'
                          : 'rgba(234, 179, 8, 0.15)',
                      color:
                        user.status === 'Active' || user.status === 'Online'
                          ? '#22c55e'
                          : user.status === 'Blocked'
                          ? '#ef4444'
                          : '#eab308'
                    }}
                  >
                    ● {user.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontWeight: '600', color: user.role === 'Super Admin' ? '#c084fc' : 'var(--primary)' }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  {user.reports > 0 ? (
                    <span style={{ color: '#ef4444', fontWeight: '600' }}>⚠️ {user.reports}</span>
                  ) : (
                    <span style={{ color: 'var(--text-dim)' }}>0</span>
                  )}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                    <button onClick={() => setSelectedUser(user)} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                      Details
                    </button>
                    <button onClick={() => setSuspendModalUser(user)} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#eab308' }}>
                      Suspend
                    </button>
                    <button onClick={() => toggleBlock(user.id)} className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                      {user.status === 'Blocked' ? 'Unblock' : 'Block'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Suspend Duration Modal */}
      {suspendModalUser && (
        <div className="modal-overlay" style={{ zIndex: 130 }}>
          <div className="glass-panel animate-pop" style={{ width: '420px', padding: '24px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#eab308' }}>Suspend {suspendModalUser.name}</h3>
              <button onClick={() => setSuspendModalUser(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSuspendSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Suspension Reason</label>
                <select value={suspendReason} onChange={(e) => setSuspendReason(e.target.value)} className="input-field">
                  <option value="Spam Activity">Spam / Excessive Messages</option>
                  <option value="Harassment">Harassment or Offensive Language</option>
                  <option value="Fake Account">Fake Profile / Impersonation</option>
                  <option value="Security Violation">Security Policy Violation</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Suspension Duration</label>
                <select value={suspendDuration} onChange={(e) => setSuspendDuration(e.target.value)} className="input-field">
                  <option value="1 hour">1 Hour</option>
                  <option value="1 day">1 Day</option>
                  <option value="7 days">7 Days</option>
                  <option value="30 days">30 Days</option>
                  <option value="Permanent">Permanent Ban</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button type="button" onClick={() => setSuspendModalUser(null)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: '#eab308' }}>Confirm Suspension</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Details Drawer */}
      {selectedUser && (
        <div className="modal-overlay" style={{ zIndex: 130 }}>
          <div className="glass-panel animate-pop" style={{ width: '450px', padding: '24px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>User Overview</h3>
              <button onClick={() => setSelectedUser(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img src={selectedUser.avatar} alt={selectedUser.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{selectedUser.name}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{selectedUser.email}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem' }}>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-dim)', display: 'block' }}>Account Status</span>
                <span style={{ fontWeight: '600' }}>{selectedUser.status}</span>
              </div>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-dim)', display: 'block' }}>Joined Date</span>
                <span style={{ fontWeight: '600' }}>{selectedUser.joined}</span>
              </div>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-dim)', display: 'block' }}>Total Messages</span>
                <span style={{ fontWeight: '600' }}>{selectedUser.msgs}</span>
              </div>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-dim)', display: 'block' }}>Total Groups</span>
                <span style={{ fontWeight: '600' }}>{selectedUser.groups}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
