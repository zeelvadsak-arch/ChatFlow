import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    bio: { type: String, default: 'Hey there! I am using ChatFlow 🚀' },
    status: { type: String, enum: ['online', 'offline', 'away', 'busy'], default: 'offline' },
    phone: { type: String, default: '' },
    isVerified: { type: Boolean, default: true }, // Default true for demo compatibility, toggled during signup
    otpCode: { type: String, default: null },
    otpExpire: { type: Date, default: null },
    refreshToken: { type: String, default: null },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
