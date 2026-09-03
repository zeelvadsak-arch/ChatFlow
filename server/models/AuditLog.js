import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    adminName: { type: String, required: true },
    adminRole: { type: String, required: true },
    action: { type: String, required: true },
    target: { type: String, required: true },
    reason: { type: String, default: '' },
    ipAddress: { type: String, default: '192.168.1.1' }
  },
  { timestamps: true }
);

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
