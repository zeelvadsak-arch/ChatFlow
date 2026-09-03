// Initial Mock Data for ChatFlow Enterprise Application

export const currentUserMock = {
  id: 'usr_me',
  name: 'Anand Patel',
  username: 'anand_p',
  email: 'anand.patel@chatflow.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: 'Senior Full Stack Developer | Building ChatFlow 🚀',
  status: 'online',
  lastSeen: 'Just now',
  twoFactorEnabled: true,
  loginHistory: [
    { device: 'Windows PC - Chrome', ip: '192.168.1.45', location: 'Ahmedabad, India', active: true, time: 'Active now' },
    { device: 'iPhone 15 Pro - App', ip: '103.24.12.9', location: 'Ahmedabad, India', active: false, time: '2 hours ago' }
  ]
};

export const contactsMock = [
  {
    id: 'c1',
    name: 'Rahul Sharma',
    username: 'rahul_s',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    lastSeen: 'Online',
    bio: 'React Native & Web Enthusiast 💻',
    favorite: true,
    isFriend: true
  },
  {
    id: 'c2',
    name: 'Jay Varma',
    username: 'jay_v',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'offline',
    lastSeen: 'Today at 09:45 AM',
    bio: 'Backend Architecture & MongoDB Expert 🍃',
    favorite: true,
    isFriend: true
  },
  {
    id: 'c3',
    name: 'Krish Patel',
    username: 'krish_p',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'away',
    lastSeen: '10 min ago',
    bio: 'UI/UX Designer @ ModernDesign Studio 🎨',
    favorite: false,
    isFriend: true
  },
  {
    id: 'c4',
    name: 'Priya Joshi',
    username: 'priya_j',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    lastSeen: 'Online',
    bio: 'Product Manager | Cloud Tech ☁️',
    favorite: false,
    isFriend: true
  },
  {
    id: 'c5',
    name: 'Neha Mehta',
    username: 'neha_m',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    status: 'offline',
    lastSeen: 'Yesterday',
    bio: 'DevOps & Kubernetes Engineer ☸️',
    favorite: false,
    isFriend: false,
    requestPending: true,
    requestType: 'incoming'
  }
];

export const groupsMock = [
  {
    id: 'grp_1',
    name: 'React Developers',
    avatar: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&auto=format&fit=crop&q=80',
    description: 'Official group for React, Redux & Vite community discussions',
    membersCount: 25,
    members: [
      { id: 'usr_me', name: 'Anand Patel', role: 'admin' },
      { id: 'c1', name: 'Rahul Sharma', role: 'member' },
      { id: 'c2', name: 'Jay Varma', role: 'member' },
      { id: 'c3', name: 'Krish Patel', role: 'admin' }
    ],
    announcement: '🚀 Next Sprint Release planned for Friday 5 PM!'
  },
  {
    id: 'grp_2',
    name: 'ChatFlow Architecture Team',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    description: 'MongoDB, Socket.IO & Node.js backend infrastructure',
    membersCount: 12,
    members: [
      { id: 'usr_me', name: 'Anand Patel', role: 'admin' },
      { id: 'c2', name: 'Jay Varma', role: 'admin' },
      { id: 'c4', name: 'Priya Joshi', role: 'member' }
    ],
    announcement: '📌 Database indexes optimized. Socket latencies now < 20ms.'
  }
];

export const chatsMock = [
  {
    id: 'chat_c1',
    type: 'direct',
    contactId: 'c1',
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    unread: 2,
    pinned: true,
    archived: false,
    lastMessage: 'Hey, how are you?',
    lastTime: '10:30 AM',
    typing: false,
    messages: [
      {
        id: 'm1',
        senderId: 'c1',
        senderName: 'Rahul',
        text: 'Hello 👋',
        time: '10:25 AM',
        status: 'seen',
        reactions: ['👍']
      },
      {
        id: 'm2',
        senderId: 'usr_me',
        senderName: 'Anand',
        text: 'Hi Rahul! 😊 How is the new chat flow going?',
        time: '10:28 AM',
        status: 'seen',
        reactions: ['🚀']
      },
      {
        id: 'm3',
        senderId: 'c1',
        senderName: 'Rahul',
        text: 'Hey, how are you?',
        time: '10:30 AM',
        status: 'delivered',
        reactions: []
      },
      {
        id: 'm4',
        senderId: 'c1',
        senderName: 'Rahul',
        text: 'Did you check the MongoDB socket pipeline schemas?',
        time: '10:31 AM',
        status: 'delivered',
        attachments: [
          { type: 'image', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80', title: 'socket_architecture.png' }
        ],
        reactions: []
      }
    ]
  },
  {
    id: 'chat_c2',
    type: 'direct',
    contactId: 'c2',
    name: 'Jay Varma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'offline',
    unread: 0,
    pinned: true,
    archived: false,
    lastMessage: 'Project ready for deployment!',
    lastTime: '09:45 AM',
    typing: false,
    messages: [
      {
        id: 'm5',
        senderId: 'c2',
        senderName: 'Jay',
        text: 'Project ready for deployment!',
        time: '09:45 AM',
        status: 'seen',
        reactions: ['🙌']
      }
    ]
  },
  {
    id: 'chat_grp_1',
    type: 'group',
    groupId: 'grp_1',
    name: 'React Developers',
    avatar: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&auto=format&fit=crop&q=80',
    membersCount: 25,
    unread: 0,
    pinned: false,
    archived: false,
    lastMessage: 'Rahul: Hello everyone',
    lastTime: 'Yesterday',
    messages: [
      {
        id: 'gm1',
        senderId: 'c1',
        senderName: 'Rahul Sharma',
        text: 'Hello everyone! Welcome to the React Developers group chat',
        time: 'Yesterday 4:00 PM',
        status: 'seen',
        reactions: ['🔥']
      },
      {
        id: 'gm2',
        senderId: 'c2',
        senderName: 'Jay Varma',
        text: 'Hi 👋 @Anand check out the updated Vite build configuration.',
        time: 'Yesterday 4:05 PM',
        status: 'seen',
        reactions: []
      },
      {
        id: 'gm3',
        senderId: 'usr_me',
        senderName: 'Anand Patel',
        text: 'Good morning guys! Looks fantastic!',
        time: 'Yesterday 4:10 PM',
        status: 'seen',
        reactions: ['❤️']
      }
    ]
  },
  {
    id: 'chat_c3',
    type: 'direct',
    contactId: 'c3',
    name: 'Krish Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'away',
    unread: 0,
    pinned: false,
    archived: false,
    lastMessage: 'See you tomorrow at office',
    lastTime: 'Yesterday',
    messages: [
      {
        id: 'm6',
        senderId: 'c3',
        senderName: 'Krish',
        text: 'See you tomorrow at office',
        time: 'Yesterday 6:20 PM',
        status: 'seen',
        reactions: []
      }
    ]
  }
];

export const notificationsMock = [
  {
    id: 'n1',
    type: 'message',
    title: 'New Message from Rahul Sharma',
    description: 'Hey, how are you?',
    time: '2 minutes ago',
    read: false,
    chatId: 'chat_c1'
  },
  {
    id: 'n2',
    type: 'friend_request',
    title: 'Friend Request Accepted',
    description: 'Jay Varma accepted your contact request',
    time: '10 minutes ago',
    read: false
  },
  {
    id: 'n3',
    type: 'mention',
    title: 'You were mentioned in React Developers',
    description: 'Jay Varma: Hi 👋 @Anand check out the updated Vite build configuration.',
    time: '1 hour ago',
    read: true,
    chatId: 'chat_grp_1'
  },
  {
    id: 'n4',
    type: 'call',
    title: 'Missed Voice Call',
    description: 'Missed call from Krish Patel',
    time: 'Yesterday 8:30 PM',
    read: true
  }
];

export const savedMessagesMock = [
  {
    id: 's1',
    title: 'Meeting Schedule',
    text: 'Tomorrow team alignment meeting at 10 AM on WebRTC room #4',
    time: 'Saved yesterday',
    chatName: 'React Developers'
  },
  {
    id: 's2',
    title: 'MongoDB Config',
    text: 'mongodb+srv://admin:pass@cluster0.chatflow.mongodb.net/chatflow-db?retryWrites=true&w=majority',
    time: 'Saved Aug 28',
    chatName: 'Jay Varma'
  },
  {
    id: 's3',
    title: 'Project Submission Link',
    text: 'https://github.com/chatflow/enterprise-chat-panel-v2',
    time: 'Saved Aug 25',
    chatName: 'Rahul Sharma'
  }
];

export const callHistoryMock = [
  {
    id: 'call_1',
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    type: 'video',
    direction: 'incoming',
    duration: '14 min 32 sec',
    time: 'Today at 08:15 AM',
    status: 'completed'
  },
  {
    id: 'call_2',
    name: 'Krish Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    type: 'voice',
    direction: 'missed',
    duration: '0 sec',
    time: 'Yesterday 8:30 PM',
    status: 'missed'
  },
  {
    id: 'call_3',
    name: 'Jay Varma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    type: 'voice',
    direction: 'outgoing',
    duration: '5 min 10 sec',
    time: '2 days ago',
    status: 'completed'
  }
];
