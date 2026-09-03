import React, { useState } from 'react';
import { HardDrive, Server, Shield, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export const AdminSettingsStorage = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistrations, setAllowRegistrations] = useState(true);
  const [maxUploadMb, setMaxUploadMb] = useState(25);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
          🗄️ Storage & System Settings
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Monitor media storage consumption, system maintenance mode, and file size constraints
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Storage Metrics Card */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Storage Consumption</h4>
            <HardDrive size={20} color="var(--primary)" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Used Storage</span>
              <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>188 GB / 500 GB</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '37.6%', height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>📷 Images</span>
              <span style={{ fontWeight: '600' }}>42 GB</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>🎥 Videos</span>
              <span style={{ fontWeight: '600' }}>120 GB</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>📄 Documents & Audio</span>
              <span style={{ fontWeight: '600' }}>26 GB</span>
            </div>
          </div>
        </div>

        {/* Maintenance & System Settings */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>System Controls</h4>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h5 style={{ fontSize: '0.88rem', fontWeight: '600' }}>Maintenance Mode</h5>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Restrict user logins during system upgrades</p>
            </div>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h5 style={{ fontSize: '0.88rem', fontWeight: '600' }}>Allow New User Registrations</h5>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Open or close public user signups</p>
            </div>
            <input
              type="checkbox"
              checked={allowRegistrations}
              onChange={(e) => setAllowRegistrations(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Max Attachment Size Limit (MB)</label>
            <input
              type="number"
              value={maxUploadMb}
              onChange={(e) => setMaxUploadMb(e.target.value)}
              className="input-field"
              style={{ height: '36px', width: '120px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
