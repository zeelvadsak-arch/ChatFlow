export const initSocket = (io) => {
  const onlineUsers = new Map(); // userId -> socketId

  io.on('connection', (socket) => {
    console.log(`⚡ Socket Connected: ${socket.id}`);

    // Register User Online
    socket.on('user_online', (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit('online_status_change', { userId, status: 'online' });
    });

    // Join Specific Conversation Room
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`👤 Socket ${socket.id} joined room: ${roomId}`);
    });

    // Send Message Real-Time Event
    socket.on('send_message', (data) => {
      const { roomId, message } = data;
      // Broadcast message to everyone in room except sender
      socket.to(roomId).emit('receive_message', message);
    });

    // Typing Indicators
    socket.on('typing', ({ roomId, userId, userName }) => {
      socket.to(roomId).emit('user_typing', { userId, userName });
    });

    socket.on('stop_typing', ({ roomId, userId }) => {
      socket.to(roomId).emit('user_stop_typing', { userId });
    });

    // WebRTC Signaling
    socket.on('call_user', ({ userToCall, signalData, from, name }) => {
      const targetSocketId = onlineUsers.get(userToCall);
      if (targetSocketId) {
        io.to(targetSocketId).emit('incoming_call', { signal: signalData, from, name });
      }
    });

    socket.on('answer_call', (data) => {
      io.to(data.to).emit('call_accepted', data.signal);
    });

    socket.on('end_call', ({ to }) => {
      const targetSocketId = onlineUsers.get(to);
      if (targetSocketId) {
        io.to(targetSocketId).emit('call_ended');
      }
    });

    // Handle Disconnect
    socket.on('disconnect', () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          io.emit('online_status_change', { userId, status: 'offline' });
          break;
        }
      }
      console.log(`🔌 Socket Disconnected: ${socket.id}`);
    });
  });
};
