import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetType: { type: String, enum: ['user', 'message', 'group'], required: true },
    targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    targetMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    reason: { type: String, required: true },
    details: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'under_review', 'resolved', 'rejected'], default: 'pending' },
    resolutionAction: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Report = mongoose.model('Report', reportSchema);
