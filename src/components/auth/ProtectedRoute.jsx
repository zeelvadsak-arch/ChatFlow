import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ef4444', gap: '10px' }}>
        <ShieldAlert size={40} />
        <h3>Access Denied: Authentication Required</h3>
      </div>
    );
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== 'super_admin') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#eab308', gap: '10px' }}>
        <ShieldAlert size={40} />
        <h3>Access Restricted: {requiredRole} Role Privileges Required</h3>
      </div>
    );
  }

  return children;
};
