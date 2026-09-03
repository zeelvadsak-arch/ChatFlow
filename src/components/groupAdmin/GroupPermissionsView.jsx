import React, { useState } from 'react';
import { Key, Check, X } from 'lucide-react';

export const GroupPermissionsView = () => {
  const [permissions, setPermissions] = useState({
    sendMessages: 'everyone',
    addMembers: 'admins',
    editGroupInfo: 'admins',
    pinMessages: 'moderators',
    sendFiles: 'everyone',
    startCalls: 'everyone'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade">
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
          🔑 Group Permissions Matrix
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Configure member, moderator, and admin permissions for this channel
        </p>
      </div>

      <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {[
          { key: 'sendMessages', label: 'Who Can Send Messages?' },
          { key: 'addMembers', label: 'Who Can Add New Members?' },
          { key: 'editGroupInfo', label: 'Who Can Edit Group Info & Avatar?' },
          { key: 'pinMessages', label: 'Who Can Pin Messages?' },
          { key: 'sendFiles', label: 'Who Can Share Files & Media?' },
          { key: 'startCalls', label: 'Who Can Start Voice / Video Calls?' }
        ].map((item) => (
          <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: '600' }}>{item.label}</span>
            <select
              value={permissions[item.key]}
              onChange={(e) => setPermissions({ ...permissions, [item.key]: e.target.value })}
              className="input-field"
              style={{ width: '150px', height: '34px', fontSize: '0.8rem' }}
            >
              <option value="everyone">Everyone (All)</option>
              <option value="moderators">Admins & Mods</option>
              <option value="admins">Admins Only</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};
