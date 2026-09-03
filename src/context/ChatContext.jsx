import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  chatsMock,
  contactsMock,
  groupsMock,
  notificationsMock,
  savedMessagesMock,
  callHistoryMock
} from '../data/mockData';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Navigation View: 'dashboard', 'chats', 'contacts', 'groups', 'calls', 'notifications', 'saved', 'search', 'profile', 'settings', 'admin'
  const [activeTab, setActiveTab] = useState('chats');
  
  // Chat Data State
  const [chats, setChats] = useState(chatsMock);
  const [activeChatId, setActiveChatId] = useState('chat_c1');
  const [contacts, setContacts] = useState(contactsMock);
  const [groups, setGroups] = useState(groupsMock);
  const [notifications, setNotifications] = useState(notificationsMock);
  const [savedMessages, setSavedMessages] = useState(savedMessagesMock);
  const [callHistory, setCallHistory] = useState(callHistoryMock);

  // Settings & Theme state
  const [theme, setTheme] = useState('dark');
  const [chatWallpaper, setChatWallpaper] = useState('default');
  const [privacySettings, setPrivacySettings] = useState({
    lastSeen: 'everyone',
    onlineStatus: 'everyone',
    profilePhoto: 'everyone',
    readReceipts: true,
    typingIndicator: true
  });
  
  // Interactive Modals & Active State
  const [activeCall, setActiveCall] = useState(null); // { name, type: 'voice'|'video', duration: 0, status: 'ringing'|'connected' }
  const [incomingCall, setIncomingCall] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [reportUserModal, setReportUserModal] = useState(null);
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [groupAdminModalGroup, setGroupAdminModalGroup] = useState(null);
  const [mediaGalleryChat, setMediaGalleryChat] = useState(null);
  const [replyToMessage, setReplyToMessage] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [blockedUsers, setBlockedUsers] = useState([]);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // Socket Simulation for Real-Time Messages
  const sendMessage = (text, attachments = [], voiceUrl = null) => {
    if (!text && attachments.length === 0 && !voiceUrl) return;

    const messageId = 'msg_' + Date.now();
    const newMsg = {
      id: messageId,
      senderId: 'usr_me',
      senderName: 'Anand Patel',
      text: editingMessage ? text : text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      replyTo: replyToMessage,
      attachments,
      voiceUrl,
      reactions: []
    };

    if (editingMessage) {
      setChats((prev) =>
        prev.map((c) => {
          if (c.id === activeChatId) {
            return {
              ...c,
              messages: c.messages.map((m) =>
                m.id === editingMessage.id ? { ...m, text: text, isEdited: true } : m
              )
            };
          }
          return c;
        })
      );
      setEditingMessage(null);
      setReplyToMessage(null);
      return;
    }

    // Append new message locally and post dynamically to backend API
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            lastMessage: text || (attachments.length > 0 ? '📷 Media' : '🎤 Voice message'),
            lastTime: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    // Dynamic backend sync
    try {
      fetch('http://localhost:5000/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer mock_jwt_token`
        },
        body: JSON.stringify({
          chatId: activeChatId,
          text,
          attachments,
          voiceUrl
        })
      }).catch(() => {});
    } catch (e) {}

    setReplyToMessage(null);

    // Step 1: Update status to 'delivered' after 800ms
    setTimeout(() => {
      setChats((prev) =>
        prev.map((c) => {
          if (c.id === activeChatId) {
            return {
              ...c,
              messages: c.messages.map((m) =>
                m.id === messageId ? { ...m, status: 'delivered' } : m
              )
            };
          }
          return c;
        })
      );
    }, 800);

    // Step 2: Show typing indicator after 1800ms
    setTimeout(() => {
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId ? { ...c, typing: true } : c
        )
      );
    }, 1800);

    // Step 3: Mark as 'seen' & bot reply after 3500ms
    setTimeout(() => {
      setChats((prev) =>
        prev.map((c) => {
          if (c.id === activeChatId) {
            const botReplies = [
              "That sounds great! Let's schedule the test build.",
              "Received! I will verify the MongoDB pipeline schemas.",
              "Awesome progress! Socket latency is super low.",
              "Thanks for updating! ChatFlow user panel is looking solid. 👍"
            ];
            const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
            const botMsg = {
              id: 'msg_bot_' + Date.now(),
              senderId: c.contactId || 'bot',
              senderName: c.name.split(' ')[0],
              text: randomReply,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: 'seen',
              reactions: []
            };

            return {
              ...c,
              typing: false,
              lastMessage: randomReply,
              lastTime: 'Just now',
              messages: c.messages
                .map((m) => (m.id === messageId ? { ...m, status: 'seen' } : m))
                .concat(botMsg)
            };
          }
          return c;
        })
      );
    }, 3500);
  };

  const addReaction = (messageId, emoji) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            messages: c.messages.map((m) => {
              if (m.id === messageId) {
                const hasReacted = m.reactions?.includes(emoji);
                const updatedReactions = hasReacted
                  ? m.reactions.filter((r) => r !== emoji)
                  : [...(m.reactions || []), emoji];
                return { ...m, reactions: updatedReactions };
              }
              return m;
            })
          };
        }
        return c;
      })
    );
  };

  const deleteMessage = (messageId) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            messages: c.messages.filter((m) => m.id !== messageId)
          };
        }
        return c;
      })
    );
  };

  const pinMessage = (message) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            pinnedMessage: c.pinnedMessage?.id === message.id ? null : message
          };
        }
        return c;
      })
    );
  };

  const saveMessage = (message) => {
    const isSaved = savedMessages.some((s) => s.id === message.id);
    if (!isSaved) {
      const newSaved = {
        id: message.id,
        title: `Saved from ${activeChat?.name}`,
        text: message.text || 'Media File',
        time: 'Just now',
        chatName: activeChat?.name
      };
      setSavedMessages([newSaved, ...savedMessages]);
    }
  };

  const createGroup = (groupData) => {
    const newGroupId = 'grp_' + Date.now();
    const newChatId = 'chat_grp_' + Date.now();
    const newGroup = {
      id: newGroupId,
      name: groupData.name,
      avatar: groupData.avatar || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
      description: groupData.description,
      membersCount: groupData.members.length + 1,
      members: [
        { id: 'usr_me', name: 'Anand Patel', role: 'admin' },
        ...groupData.members.map((id) => {
          const contact = contacts.find((c) => c.id === id);
          return { id: contact.id, name: contact.name, role: 'member' };
        })
      ],
      announcement: `Welcome to ${groupData.name}!`
    };

    const newGroupChat = {
      id: newChatId,
      type: 'group',
      groupId: newGroupId,
      name: groupData.name,
      avatar: newGroup.avatar,
      membersCount: newGroup.membersCount,
      unread: 0,
      pinned: false,
      archived: false,
      lastMessage: 'Group created',
      lastTime: 'Just now',
      messages: [
        {
          id: 'gm_init',
          senderId: 'usr_me',
          senderName: 'Anand Patel',
          text: `🎉 Created group "${groupData.name}"`,
          time: 'Just now',
          status: 'seen',
          reactions: []
        }
      ]
    };

    setGroups([newGroup, ...groups]);
    setChats([newGroupChat, ...chats]);
    setActiveChatId(newChatId);
    setActiveTab('chats');
    setCreateGroupModalOpen(false);
  };

  const initiateCall = (contact, type = 'voice') => {
    setActiveCall({
      contact,
      type,
      duration: 0,
      status: 'ringing',
      isMuted: false,
      isVideoOn: type === 'video',
      isScreenSharing: false
    });
  };

  const endCall = () => {
    if (activeCall) {
      const newCallLog = {
        id: 'call_' + Date.now(),
        name: activeCall.contact.name,
        avatar: activeCall.contact.avatar,
        type: activeCall.type,
        direction: 'outgoing',
        duration: `${activeCall.duration} sec`,
        time: 'Just now',
        status: 'completed'
      };
      setCallHistory([newCallLog, ...callHistory]);
    }
    setActiveCall(null);
    setIncomingCall(null);
  };

  const blockUser = (contact) => {
    if (!blockedUsers.some((b) => b.id === contact.id)) {
      setBlockedUsers([...blockedUsers, contact]);
    }
    setSelectedUserProfile(null);
  };

  const unblockUser = (contactId) => {
    setBlockedUsers(blockedUsers.filter((b) => b.id !== contactId));
  };

  const submitReport = (reportData) => {
    // Add to notifications / admin preview
    const reportNotice = {
      id: 'n_report_' + Date.now(),
      type: 'system',
      title: 'Report Submitted',
      description: `Report for ${reportData.targetName} (${reportData.reason}) sent to Admin Panel.`,
      time: 'Just now',
      read: false
    };
    setNotifications([reportNotice, ...notifications]);
    setReportUserModal(null);
  };

  return (
    <ChatContext.Provider
      value={{
        activeTab,
        setActiveTab,
        chats,
        activeChatId,
        setActiveChatId,
        activeChat,
        contacts,
        groups,
        notifications,
        savedMessages,
        callHistory,
        sendMessage,
        addReaction,
        deleteMessage,
        pinMessage,
        saveMessage,
        replyToMessage,
        setReplyToMessage,
        editingMessage,
        setEditingMessage,
        createGroupModalOpen,
        setCreateGroupModalOpen,
        groupAdminModalGroup,
        setGroupAdminModalGroup,
        createGroup,
        activeCall,
        setActiveCall,
        initiateCall,
        endCall,
        incomingCall,
        setIncomingCall,
        selectedUserProfile,
        setSelectedUserProfile,
        reportUserModal,
        setReportUserModal,
        submitReport,
        mediaGalleryChat,
        setMediaGalleryChat,
        blockedUsers,
        blockUser,
        unblockUser,
        theme,
        setTheme,
        chatWallpaper,
        setChatWallpaper,
        privacySettings,
        setPrivacySettings,
        globalSearchQuery,
        setGlobalSearchQuery
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
