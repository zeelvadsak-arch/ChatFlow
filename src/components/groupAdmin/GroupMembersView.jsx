import React, { useState } from 'react';
import { Search, UserPlus, Shield, ShieldAlert, VolumeX, Ban, UserMinus, X, Check } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const GroupMembersView = () => {
  const { contacts } = useChat();

  const [members, setMembers] = useState([
    { id: 'usr_me', name: 'Anand Patel', role: 'Owner', status: 'Online', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { id: 'c1', name: 'Rahul Sharma', role: 'Admin', status: 'Online', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
    { id: 'c3', name: 'Krish Patel', role: 'Moderator', status: 'Away', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { id: 'c2', name: 'Jay Varma', role: 'Member', status: 'Offline', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { id: 'c4', name: 'Priya Joshi', role: 'Member', status: 'Muted', mutedUntil: '8:00 PM', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
  ]);

  const [search, setSearch] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('all'); // 'all', 'admins', 'moderators', 'muted', 'banned'

  // Modals state
  const [muteModalUser, setMuteModalUser] = useState(null);
  const [muteDuration, setMuteDuration] = useState('1 hour');
  
  const [banModalUser, setBanModalUser] = useState(null);
  const [banDuration, setBanDuration] = useState('7 days');
  const [banReason, setBanReason] = useState('Repeated Spam');

  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [selectedContactsToAdd, setSelectedContactsToAdd] = useState([]);

  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;

    if (activeSubTab === 'admins') return m.role === 'Admin' || m.role === 'Owner';
    if (activeSubTab === 'moderators') return m.role === 'Moderator';
    if (activeSubTab === 'muted') return m.status === 'Muted';
    if (activeSubTab === 'banned') return m.status === 'Banned';
    return true;
  });

  const handleRoleChange = (memberId, newRole) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId && m.role !== 'Owner' ? { ...m, role: newRole } : m))
    );
  };

  const handleRemoveMember = (memberId) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId && m.role !== 'Owner'));
  };

  const handleMuteSubmit = (e) => {
    e.preventDefault();
    if (!muteModalUser) return;
    setMembers((prev) =>
      prev.map((m) => (m.id === muteModalUser.id ? { ...m, status: 'Muted', mutedUntil: '8:00 PM' } : m))
    );
    setMuteModalUser(null);
  };

  const handleBanSubmit = (e) => {
    e.preventDefault();
    if (!banModalUser) return;
    setMembers((prev) =>
      prev.map((m) => (m.id === banModalUser.id ? { ...m, status: 'Banned' } : m))
    );
    setBanModalUser(null);
  };

  const handleAddMembersSubmit = () => {
    const newMembers = selectedContactsToAdd.map((id) => {
      const contact = contacts.find((c) => c.id === id);
      return {
        id: contact.id,
        name: contact.name,
        role: 'Member',
        status: 'Online',
        avatar: contact.avatar
      };
    });
    setMembers([...members, ...newMembers]);
    setAddMemberOpen(false);
    setSelectedContactsToAdd([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade">
      {/* Header Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search group members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '36px', height: '36px', fontSize: '0.82rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setAddMemberOpen(true)} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            <UserPlus size={15} /> Add Member
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        {['all', 'admins', 'moderators', 'muted', 'banned'].map((t) => (
          <button
            key={t}
            onClick={() => setActiveSubTab(t)}
            className="btn"
            style={{
              padding: '5px 12px',
              fontSize: '0.78rem',
              borderRadius: 'var(--radius-full)',
              background: activeSubTab === t ? 'var(--secondary)' : 'rgba(255,255,255,0.05)',
              color: activeSubTab === t ? '#fff' : 'var(--text-muted)',
              textTransform: 'capitalize'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Members Table */}
      <div className="glass-card" style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px' }}>Member</th>
              <th style={{ padding: '12px 16px' }}>Group Role</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((m) => (
              <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={m.avatar} alt={m.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{m.name}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span
                    style={{
                      fontWeight: '600',
                      color: m.role === 'Owner' ? '#c084fc' : m.role === 'Admin' ? 'var(--primary)' : m.role === 'Moderator' ? '#eab308' : 'var(--text-muted)'
                    }}
                  >
                    {m.role === 'Owner' ? '👑 Owner' : m.role}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: '0.78rem', color: m.status === 'Muted' ? '#eab308' : m.status === 'Banned' ? '#ef4444' : '#22c55e' }}>
                    {m.status === 'Muted' ? `🔇 Muted (until ${m.mutedUntil})` : `● ${m.status}`}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  {m.role !== 'Owner' ? (
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      {/* Role Dropdown */}
                      <select
                        value={m.role}
                        onChange={(e) => handleRoleChange(m.id, e.target.value)}
                        className="input-field"
                        style={{ width: '110px', height: '30px', fontSize: '0.75rem', padding: '2px 6px' }}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Member">Member</option>
                      </select>

                      <button onClick={() => setMuteModalUser(m)} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.72rem', color: '#eab308' }} title="Mute">
                        <VolumeX size={13} /> Mute
                      </button>

                      <button onClick={() => setBanModalUser(m)} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.72rem', color: '#ef4444' }} title="Ban">
                        <Ban size={13} /> Ban
                      </button>

                      <button onClick={() => handleRemoveMember(m.id)} className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '0.72rem' }} title="Remove">
                        <UserMinus size={13} />
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Group Creator</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mute Modal */}
      {muteModalUser && (
        <div className="modal-overlay" style={{ zIndex: 140 }}>
          <div className="glass-panel animate-pop" style={{ width: '380px', padding: '20px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#eab308' }}>🔇 Mute {muteModalUser.name}</h4>
              <button onClick={() => setMuteModalUser(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleMuteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', marginBottom: '4px' }}>Mute Duration</label>
                <select value={muteDuration} onChange={(e) => setMuteDuration(e.target.value)} className="input-field">
                  <option value="1 hour">1 Hour</option>
                  <option value="1 day">1 Day</option>
                  <option value="7 days">7 Days</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button type="button" onClick={() => setMuteModalUser(null)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: '#eab308' }}>Confirm Mute</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ban Modal */}
      {banModalUser && (
        <div className="modal-overlay" style={{ zIndex: 140 }}>
          <div className="glass-panel animate-pop" style={{ width: '400px', padding: '20px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#ef4444' }}>🚫 Ban {banModalUser.name}</h4>
              <button onClick={() => setBanModalUser(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleBanSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', marginBottom: '4px' }}>Ban Reason</label>
                <input type="text" value={banReason} onChange={(e) => setBanReason(e.target.value)} className="input-field" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', marginBottom: '4px' }}>Ban Duration</label>
                <select value={banDuration} onChange={(e) => setBanDuration(e.target.value)} className="input-field">
                  <option value="1 hour">1 Hour</option>
                  <option value="1 day">1 Day</option>
                  <option value="7 days">7 Days</option>
                  <option value="30 days">30 Days</option>
                  <option value="Permanent">Permanent Ban</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button type="button" onClick={() => setBanModalUser(null)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-danger" style={{ flex: 1 }}>Confirm Ban</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Member Wizard Modal */}
      {addMemberOpen && (
        <div className="modal-overlay" style={{ zIndex: 140 }}>
          <div className="glass-panel animate-pop" style={{ width: '420px', padding: '20px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Add Member to Group</h4>
              <button onClick={() => setAddMemberOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {contacts.map((c) => {
                const isSelected = selectedContactsToAdd.includes(c.id);
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      if (isSelected) setSelectedContactsToAdd(selectedContactsToAdd.filter((id) => id !== c.id));
                      else setSelectedContactsToAdd([...selectedContactsToAdd, c.id]);
                    }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', background: isSelected ? 'var(--primary-glow)' : 'rgba(255,255,255,0.03)', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={c.avatar} alt={c.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: '0.85rem' }}>{c.name}</span>
                    </div>
                    {isSelected && <Check size={14} color="var(--primary)" />}
                  </div>
                );
              })}
            </div>
            <button onClick={handleAddMembersSubmit} className="btn btn-primary" style={{ marginTop: '6px' }}>
              Add Selected Members ({selectedContactsToAdd.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
