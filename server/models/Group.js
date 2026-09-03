import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&auto=format&fit=crop&q=80' },
    description: { type: String, default: '' },
    announcement: { type: String, default: '' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    mutedMembers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        until: { type: Date },
        reason: { type: String }
      }
    ],
    bannedMembers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reason: { type: String },
        until: { type: Date }
      }
    ],
    joinRequests: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        note: { type: String }
      }
    ],
    privacy: { type: String, enum: ['public', 'private'], default: 'public' },
    inviteLink: { type: String, default: '' },
    permissions: {
      sendMessages: { type: String, default: 'members' },
      addMembers: { type: String, default: 'admins' },
      editGroupInfo: { type: String, default: 'admins' },
      pinMessages: { type: String, default: 'moderators' },
      sendFiles: { type: String, default: 'members' },
      startCalls: { type: String, default: 'members' }
    }
  },
  { timestamps: true }
);

export const Group = mongoose.model('Group', groupSchema);
