import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import groupAdminRoutes from './routes/groupAdminRoutes.js';
import { initSocket } from './sockets/socketHandler.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO Setup with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Socket Handler Initialization
initSocket(io);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/group-admin', groupAdminRoutes);

// System Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'ChatFlow Node.js + Socket.IO Backend',
    timestamp: new Date().toISOString(),
    mongo: 'Connected'
  });
});

const PORT = process.env.PORT || 5000;

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️ Port ${PORT} is already in use. Your ChatFlow Backend Server is ALREADY RUNNING on Port ${PORT}!`);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, () => {
  console.log(`🚀 ChatFlow Enterprise Backend Server running on port ${PORT}`);
  console.log(`📡 Socket.IO Engine listening for real-time events...`);
});
