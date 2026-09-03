import express from 'express';
import {
  getAdminStats,
  suspendUser,
  resolveReport,
  createAnnouncement,
  getAuditLogs
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { verifyAdminRole } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/stats', protect, verifyAdminRole(), getAdminStats);
router.post('/suspend-user', protect, verifyAdminRole(), suspendUser);
router.post('/resolve-report', protect, verifyAdminRole(), resolveReport);
router.post('/announcement', protect, verifyAdminRole(), createAnnouncement);
router.get('/audit-logs', protect, verifyAdminRole(), getAuditLogs);

export default router;
