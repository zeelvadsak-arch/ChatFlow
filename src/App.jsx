import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useChat } from './context/ChatContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

// Auth Pages
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { VerifyEmailPage } from './pages/VerifyEmail';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { ResetPasswordPage } from './pages/ResetPassword';

// Views
import { DashboardView } from './components/dashboard/DashboardView';
import { ChatList } from './components/chat/ChatList';
import { ChatWindow } from './components/chat/ChatWindow';
import { ContactList } from './components/contacts/ContactList';
import { GroupHub } from './components/groups/GroupHub';
import { CallHistory } from './components/calls/CallHistory';
import { NotificationPanel } from './components/notifications/NotificationPanel';
import { SavedMessages } from './components/saved/SavedMessages';
import { GlobalSearch } from './components/common/GlobalSearch';
import { MyProfile } from './components/profile/MyProfile';
import { SettingsView } from './components/settings/SettingsView';

// Modals
import { CallModal } from './components/calls/CallModal';
import { CreateGroupModal } from './components/chat/CreateGroupModal';
import { UserProfileModal } from './components/contacts/UserProfileModal';
import { ReportModal } from './components/common/ReportModal';
import { MediaGalleryModal } from './components/common/MediaGalleryModal';
import { GroupAdminModal } from './components/groupAdmin/GroupAdminModal';

export const MainApp = () => {
  const { isAuthenticated } = useAuth();
  const { activeTab, theme, createGroupModalOpen, groupAdminModalGroup, setGroupAdminModalGroup } = useChat();

  // Auth Routing State: 'login', 'signup', 'verify', 'forgot', 'reset'
  const [authPage, setAuthPage] = useState('login');
  const [authEmail, setAuthEmail] = useState('');

  if (!isAuthenticated) {
    if (authPage === 'signup') {
      return (
        <SignupPage
          onNavigateToLogin={() => setAuthPage('login')}
          onNavigateToVerify={(email) => {
            setAuthEmail(email);
            setAuthPage('verify');
          }}
        />
      );
    }

    if (authPage === 'verify') {
      return (
        <VerifyEmailPage
          email={authEmail}
          onNavigateToLogin={() => setAuthPage('login')}
        />
      );
    }

    if (authPage === 'forgot') {
      return (
        <ForgotPasswordPage
          onNavigateToReset={(email) => {
            setAuthEmail(email);
            setAuthPage('reset');
          }}
          onNavigateToLogin={() => setAuthPage('login')}
        />
      );
    }

    if (authPage === 'reset') {
      return (
        <ResetPasswordPage
          email={authEmail}
          onNavigateToLogin={() => setAuthPage('login')}
        />
      );
    }

    return (
      <LoginPage
        onNavigateToSignup={() => setAuthPage('signup')}
        onNavigateToForgot={() => setAuthPage('forgot')}
      />
    );
  }

  return (
    <div className="app-container" data-theme={theme}>
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Workspace */}
      <main className="main-content">
        <Header />

        <div className="workspace-area">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'chats' && (
            <>
              <ChatList />
              <ChatWindow />
            </>
          )}
          {activeTab === 'contacts' && <ContactList />}
          {activeTab === 'groups' && <GroupHub />}
          {activeTab === 'calls' && <CallHistory />}
          {activeTab === 'notifications' && <NotificationPanel />}
          {activeTab === 'saved' && <SavedMessages />}
          {activeTab === 'search' && <GlobalSearch />}
          {activeTab === 'profile' && <MyProfile />}
          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>

      {/* Global Interactive Overlays */}
      <CallModal />
      {createGroupModalOpen && <CreateGroupModal />}
      {groupAdminModalGroup && (
        <GroupAdminModal
          group={groupAdminModalGroup}
          onClose={() => setGroupAdminModalGroup(null)}
        />
      )}
      <UserProfileModal />
      <ReportModal />
      <MediaGalleryModal />
    </div>
  );
};

export default MainApp;
