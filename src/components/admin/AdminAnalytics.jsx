import React from 'react';
import { BarChart3, TrendingUp, Activity, MessageSquare, Users } from 'lucide-react';

export const AdminAnalytics = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const userGrowth = [4200, 8500, 12900, 16400, 19800, 22100, 24000, 25430];
  const messageVolume = [320, 540, 680, 720, 890, 950, 1120, 1250];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade">
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
          📊 Platform Analytics & Growth Metrics
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          System-wide performance, message throughput, and user registration analytics
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* User Growth Chart */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>User Growth Trend 📈</h4>
              <span style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: '600' }}>+24.5% Month over Month</span>
            </div>
            <TrendingUp size={22} color="#22c55e" />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            {userGrowth.map((val, idx) => {
              const heightPercent = (val / 30000) * 100;
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '100%',
                      height: `${heightPercent}%`,
                      background: 'linear-gradient(180deg, var(--primary), #4f46e5)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.4s ease'
                    }}
                  ></div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{months[idx]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Volume Chart */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Message Throughput (K msgs) 📊</h4>
              <span style={{ fontSize: '0.75rem', color: '#8b5cf6', fontWeight: '600' }}>1.25 Million Total Messages</span>
            </div>
            <BarChart3 size={22} color="#8b5cf6" />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            {messageVolume.map((val, idx) => {
              const heightPercent = (val / 1500) * 100;
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '100%',
                      height: `${heightPercent}%`,
                      background: 'linear-gradient(180deg, #8b5cf6, #ec4899)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.4s ease'
                    }}
                  ></div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{months[idx]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
