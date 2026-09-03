import express from 'express';
import {
  getGroupStats,
  updateRole,
  muteMember,
  banMember,
  handleJoinRequest,
  manageInviteLink
} from '../controllers/groupAdminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:groupId/stats', protect, getGroupStats);
router.post('/role', protect, updateRole);
router.post('/mute', protect, muteMember);
router.post('/ban', protect, banMember);
router.post('/join-request', protect, handleJoinRequest);
router.post('/invite-link', protect, manageInviteLink);

export default router;
