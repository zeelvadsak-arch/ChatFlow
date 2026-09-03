import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useChat } from './context/ChatContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { tabToPathMap, pathToTabMap, PAGE_ROUTES } from './config/apiConfig';

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
  const { activeTab, setActiveTab, theme, createGroupModalOpen, groupAdminModalGroup, setGroupAdminModalGroup } = useChat();

  // Auth Routing State: 'login', 'signup', 'verify', 'forgot', 'reset'
  const [authPage, setAuthPage] = useState('login');
  const [authEmail, setAuthEmail] = useState('');

  // Initial Sync of URL Path to State
  useEffect(() => {
    const currentPath = window.location.pathname;

    if (!isAuthenticated) {
      if (currentPath === PAGE_ROUTES.SIGNUP) setAuthPage('signup');
      else if (currentPath === PAGE_ROUTES.VERIFY) setAuthPage('verify');
      else if (currentPath === PAGE_ROUTES.FORGOT) setAuthPage('forgot');
      else if (currentPath === PAGE_ROUTES.RESET) setAuthPage('reset');
      else setAuthPage('login');
    } else {
      if (pathToTabMap[currentPath]) {
        setActiveTab(pathToTabMap[currentPath]);
      } else {
        window.history.replaceState(null, '', tabToPathMap[activeTab] || PAGE_ROUTES.CHATS);
      }
    }
  }, [isAuthenticated]);

  // Sync URL Path when Active Tab or Auth Page changes
  useEffect(() => {
    if (isAuthenticated) {
      const targetPath = tabToPathMap[activeTab] || PAGE_ROUTES.CHATS;
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    } else {
      let authPath = PAGE_ROUTES.LOGIN;
      if (authPage === 'signup') authPath = PAGE_ROUTES.SIGNUP;
      if (authPage === 'verify') authPath = PAGE_ROUTES.VERIFY;
      if (authPage === 'forgot') authPath = PAGE_ROUTES.FORGOT;
      if (authPage === 'reset') authPath = PAGE_ROUTES.RESET;

      if (window.location.pathname !== authPath) {
        window.history.pushState(null, '', authPath);
      }
    }
  }, [activeTab, authPage, isAuthenticated]);

  // Listen to Browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (isAuthenticated && pathToTabMap[path]) {
        setActiveTab(pathToTabMap[path]);
      } else if (!isAuthenticated) {
        if (path === PAGE_ROUTES.SIGNUP) setAuthPage('signup');
        else if (path === PAGE_ROUTES.VERIFY) setAuthPage('verify');
        else if (path === PAGE_ROUTES.FORGOT) setAuthPage('forgot');
        else if (path === PAGE_ROUTES.RESET) setAuthPage('reset');
        else setAuthPage('login');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated, setActiveTab]);

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
