import React, { useState } from 'react';
import { Megaphone, Send, CheckCircle } from 'lucide-react';

export const GroupAnnouncementsView = ({ group }) => {
  const [announcementText, setAnnouncementText] = useState(group.announcement || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    group.announcement = announcementText;
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade">
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
          📢 Group Announcement Banner
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Pinned announcement text visible to all group members in the channel header
        </p>
      </div>

      <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {savedSuccess && (
          <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={16} /> Group announcement banner updated!
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Announcement Banner Text *</label>
            <textarea
              rows={3}
              placeholder="e.g. 🚀 Next Sprint Release planned for Friday 5 PM!"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="input-field"
              style={{ resize: 'none', paddingTop: '8px' }}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: 'fit-content', background: 'var(--secondary)', gap: '6px' }}>
            <Megaphone size={16} /> Update Group Announcement Banner
          </button>
        </form>
      </div>
    </div>
  );
};
