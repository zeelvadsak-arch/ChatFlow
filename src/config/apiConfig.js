// Central API and URL Routing Configuration for ChatFlow Enterprise

export const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth Endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  ME: `${API_BASE_URL}/auth/me`,

  // Chat & Communication Endpoints
  CHATS: `${API_BASE_URL}/chats`,
  GROUPS: `${API_BASE_URL}/groups`,
  CONTACTS: `${API_BASE_URL}/contacts`,
  CALLS: `${API_BASE_URL}/calls`,
  NOTIFICATIONS: `${API_BASE_URL}/notifications`,

  // Admin Endpoints
  ADMIN: `${API_BASE_URL}/admin`,
  GROUP_ADMIN: `${API_BASE_URL}/group-admin`,
  HEALTH: `${API_BASE_URL}/health`
};

export const PAGE_ROUTES = {
  DASHBOARD: '/dashboard',
  CHATS: '/chats',
  CONTACTS: '/contacts',
  GROUPS: '/groups',
  CALLS: '/calls',
  NOTIFICATIONS: '/notifications',
  SAVED: '/saved',
  SEARCH: '/search',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // Auth Routes
  LOGIN: '/login',
  SIGNUP: '/signup',
  VERIFY: '/verify-email',
  FORGOT: '/forgot-password',
  RESET: '/reset-password'
};

export const tabToPathMap = {
  dashboard: PAGE_ROUTES.DASHBOARD,
  chats: PAGE_ROUTES.CHATS,
  contacts: PAGE_ROUTES.CONTACTS,
  groups: PAGE_ROUTES.GROUPS,
  calls: PAGE_ROUTES.CALLS,
  notifications: PAGE_ROUTES.NOTIFICATIONS,
  saved: PAGE_ROUTES.SAVED,
  search: PAGE_ROUTES.SEARCH,
  profile: PAGE_ROUTES.PROFILE,
  settings: PAGE_ROUTES.SETTINGS
};

export const pathToTabMap = Object.entries(tabToPathMap).reduce((acc, [tab, path]) => {
  acc[path] = tab;
  return acc;
}, {});
