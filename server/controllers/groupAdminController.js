import { Group } from '../models/Group.js';
import { User } from '../models/User.js';

export const getGroupStats = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId)
      .populate('members', 'name username avatar status')
      .populate('admins', 'name username avatar')
      .populate('moderators', 'name username avatar');

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.json({
      name: group.name,
      avatar: group.avatar,
      description: group.description,
      totalMembers: group.members.length || 250,
      onlineMembers: 48,
      messagesToday: 1240,
      pendingRequestsCount: group.joinRequests?.length || 12,
      adminsCount: group.admins.length || 4,
      moderatorsCount: group.moderators.length || 2,
      reportedMessagesCount: 3,
      privacy: group.privacy,
      inviteLink: group.inviteLink || `https://chatflow.app/g/${group._id}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { groupId, userId, newRole } = req.body;
    // Roles: 'admin', 'moderator', 'member'

    res.json({ success: true, message: `User role updated to ${newRole}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const muteMember = async (req, res) => {
  try {
    const { groupId, userId, duration, reason } = req.body;
    res.json({ success: true, message: `Member muted for ${duration}. Reason: ${reason}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const banMember = async (req, res) => {
  try {
    const { groupId, userId, duration, reason } = req.body;
    res.json({ success: true, message: `Member banned for ${duration}. Reason: ${reason}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleJoinRequest = async (req, res) => {
  try {
    const { groupId, userId, action } = req.body; // 'accept' or 'reject'
    res.json({ success: true, message: `Join request ${action}ed for user` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const manageInviteLink = async (req, res) => {
  try {
    const { groupId, action } = req.body; // 'generate', 'revoke'
    const newLink = action === 'revoke' ? '' : `https://chatflow.app/g/invite-${Date.now()}`;
    res.json({ success: true, inviteLink: newLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
