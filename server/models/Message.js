import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    text: { type: String, default: '' },
    attachments: [
      {
        type: { type: String },
        url: { type: String },
        title: { type: String }
      }
    ],
    voiceUrl: { type: String, default: null },
    status: { type: String, enum: ['sent', 'delivered', 'seen'], default: 'sent' },
    reactions: [{ type: String }],
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    isEdited: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Message = mongoose.model('Message', messageSchema);
