export const verifyAdminRole = (allowedRoles = ['super_admin', 'admin', 'moderator']) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const userRole = req.user.role || 'user';
    
    // Fallback for demonstration if user is marked admin
    if (userRole === 'admin' || userRole === 'super_admin' || allowedRoles.includes(userRole)) {
      return next();
    }

    return res.status(403).json({ message: 'Access Denied: Admin privileges required' });
  };
};
