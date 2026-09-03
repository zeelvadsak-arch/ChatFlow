import React, { useState } from 'react';
import { X, Flag, AlertTriangle } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const ReportModal = () => {
  const { reportUserModal, setReportUserModal, submitReport } = useChat();
  const [reason, setReason] = useState('Spam');
  const [details, setDetails] = useState('');

  if (!reportUserModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReport({
      targetName: reportUserModal.targetName,
      reason,
      details
    });
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 120 }}>
      <div
        className="glass-panel animate-pop"
        style={{
          width: '420px',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Flag size={22} color="#ef4444" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Report {reportUserModal.targetName}
            </h3>
          </div>
          <button onClick={() => setReportUserModal(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Select Reason *
            </label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="input-field">
              <option value="Spam">Spam & Promotional Links</option>
              <option value="Harassment">Harassment or Abuse</option>
              <option value="Fake Account">Fake Account / Impersonation</option>
              <option value="Inappropriate Content">Inappropriate Content</option>
              <option value="Other">Other Reason</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Additional Details (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Describe the issue for the Admin review team..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="input-field"
              style={{ resize: 'none', paddingTop: '8px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setReportUserModal(null)} className="btn btn-secondary" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-danger" style={{ flex: 1 }}>
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
