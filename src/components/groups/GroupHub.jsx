import React, { useState } from 'react';
import { Users, Plus, MessageSquare, Shield, Megaphone } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const GroupHub = () => {
  const { groups, setCreateGroupModalOpen, setActiveTab, setActiveChatId, setGroupAdminModalGroup } = useChat();
  const [tab, setTab] = useState('my_groups');

  return (
    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>Groups & Communities</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Collaborate with multiple members in real-time group channels</p>
        </div>

        <button onClick={() => setCreateGroupModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Create Group
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
        {groups.map((group) => (
          <div key={group.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img src={group.avatar} alt={group.name} style={{ width: '52px', height: '52px', borderRadius: '16px', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)' }}>{group.name}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '600' }}>
                  {group.membersCount} Members Active
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              {group.description}
            </p>

            {group.announcement && (
              <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(139, 92, 246, 0.1)', borderLeft: '3px solid var(--secondary)', fontSize: '0.78rem', color: '#c084fc' }}>
                <Megaphone size={13} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                {group.announcement}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  setActiveChatId('chat_grp_1');
                  setActiveTab('chats');
                }}
                className="btn btn-primary"
                style={{ flex: 1, fontSize: '0.82rem' }}
              >
                <MessageSquare size={16} /> Enter Group Chat
              </button>

              <button
                onClick={() => setGroupAdminModalGroup(group)}
                className="btn btn-secondary"
                style={{ fontSize: '0.82rem', padding: '6px 12px', gap: '4px', background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc' }}
                title="Open Group Admin Panel"
              >
                <Shield size={16} /> Admin
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
