// Backend API base URL. Set REACT_APP_API_URL in .env (e.g. http://localhost:8080).
export const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export function getAuthToken() {
  return localStorage.getItem('adminToken');
}

export function setAuthToken(token) {
  if (token) localStorage.setItem('adminToken', token);
  else localStorage.removeItem('adminToken');
}

export function getAdmin() {
  try {
    const s = localStorage.getItem('admin');
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

export function setAdmin(admin) {
  if (admin) localStorage.setItem('admin', JSON.stringify(admin));
  else localStorage.removeItem('admin');
}
