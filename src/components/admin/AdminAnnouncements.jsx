import React, { useState } from 'react';
import { Megaphone, Send, Bell, Users, CheckCircle } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const AdminAnnouncements = () => {
  const { notifications, setNotifications } = useChat();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('all'); // 'all', 'users', 'groups'
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newNotification = {
      id: 'n_admin_' + Date.now(),
      type: 'system',
      title: `📢 Announcement: ${title}`,
      description,
      time: 'Just now',
      read: false
    };

    setNotifications([newNotification, ...notifications]);
    setPublishedSuccess(true);
    setTitle('');
    setDescription('');

    setTimeout(() => setPublishedSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
          📢 Broadcast Announcements & System Alerts
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Publish platform-wide announcements or scheduled maintenance notifications to all users
        </p>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {publishedSuccess && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#22c55e', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={18} /> System Announcement Published & Broadcast to Socket Clients!
          </div>
        )}

        <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Announcement Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Scheduled System Maintenance at 12:00 AM"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Target Audience
            </label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="input-field"
            >
              <option value="all">🌐 All Registered Users (25,430 Users)</option>
              <option value="users">👤 Active Individual Users Only</option>
              <option value="groups">👥 Public Group Channels</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Announcement Message Body *
            </label>
            <textarea
              rows={4}
              placeholder="Write detailed announcement message to be broadcasted live..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              style={{ resize: 'none', paddingTop: '8px' }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: 'fit-content', padding: '10px 24px', fontSize: '0.88rem', gap: '8px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}
          >
            <Megaphone size={18} /> Broadcast Announcement
          </button>
        </form>
      </div>
    </div>
  );
};
