import { Group } from '../models/Group.js';

export const verifyGroupAdminRole = (requiredLevel = 'moderator') => {
  return async (req, res, next) => {
    try {
      const groupId = req.params.groupId || req.body.groupId;
      if (!groupId) {
        return res.status(400).json({ message: 'Group ID is required' });
      }

      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group channel not found' });
      }

      const userId = req.user._id.toString();
      const isOwner = group.owner?.toString() === userId;
      const isAdmin = group.admins.some((a) => a.toString() === userId) || isOwner;
      const isModerator = group.moderators.some((m) => m.toString() === userId) || isAdmin;

      req.group = group;
      req.userGroupRole = isOwner ? 'owner' : isAdmin ? 'admin' : isModerator ? 'moderator' : 'member';

      if (requiredLevel === 'owner' && !isOwner) {
        return res.status(403).json({ message: 'Access Denied: Group Owner privileges required' });
      }

      if (requiredLevel === 'admin' && !isAdmin) {
        return res.status(403).json({ message: 'Access Denied: Group Admin privileges required' });
      }

      if (requiredLevel === 'moderator' && !isModerator) {
        return res.status(403).json({ message: 'Access Denied: Group Moderator privileges required' });
      }

      return next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
};
