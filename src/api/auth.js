import client from './client';
import { setAuthToken, setAdmin } from './config';

export async function login(email, password) {
  const { data } = await client.post('/login', { email, password });
  if (data.code !== 1) throw new Error(data.msg || 'Login failed');
  setAuthToken(data.token);
  setAdmin(data.admin);
  return data;
}

export async function register(email, password) {
  const { data } = await client.post('/register', { email, password });
  if (data.code !== 1) throw new Error(data.msg || 'Registration failed');
  setAuthToken(data.token);
  setAdmin(data.admin);
  return data;
}

/** Register a new admin (e.g. from dashboard). Does not change current user session. */
export async function registerNewAdmin(email, password) {
  const { data } = await client.post('/register', { email, password });
  if (data.code !== 1) throw new Error(data.msg || 'Registration failed');
  return data;
}

/** Update admin profile. Pass currentPassword; optionally email and/or newPassword. */
export async function updateProfile({ currentPassword, email, newPassword }) {
  const { data } = await client.patch('/profile', {
    currentPassword,
    email: email || undefined,
    newPassword: newPassword || undefined,
  });
  if (data.code !== 1) throw new Error(data.msg || 'Update failed');
  if (data.admin) setAdmin(data.admin);
  return data;
}

/** Forgot password step 1: check if email exists. Throws if not found. */
export async function forgotPasswordCheck(email) {
  const { data } = await client.post('/forgot-password', { email });
  if (data.code !== 1) throw new Error(data.msg || 'Email not found');
  return data;
}

/** Forgot password step 2: set new password (after email was verified). */
export async function resetPasswordWithEmail(email, newPassword, confirmPassword) {
  const { data } = await client.post('/reset-password', { email, newPassword, confirmPassword });
  if (data.code !== 1) throw new Error(data.msg || 'Failed to reset password');
  return data;
}
