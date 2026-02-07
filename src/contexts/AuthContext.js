import React, { createContext, useState, useCallback } from 'react';
import { getAdmin, getAuthToken, setAuthToken, setAdmin } from '../api/config';
import * as authApi from '../api/auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => (getAuthToken() && getAdmin()) || null);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);
    setCurrentUser(data.admin);
    return data;
  }, []);

  const signUp = useCallback(async (email, password) => {
    const data = await authApi.register(email, password);
    setCurrentUser(data.admin);
    return data;
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setAdmin(null);
    setCurrentUser(null);
  }, []);

  const updateProfileCb = useCallback(async (currentPassword, { email, newPassword } = {}) => {
    const data = await authApi.updateProfile({ currentPassword, email, newPassword });
    if (data.admin) setCurrentUser(data.admin);
    return data;
  }, []);

  const value = {
    currentUser,
    user: currentUser ? { ...currentUser, role: 'admin' } : null,
    login,
    loginEmail: login,
    logout,
    logOut: logout,
    signUp,
    updateProfile: updateProfileCb,
    resetPassword: async () => { throw new Error('Password reset not implemented'); },
    updateEmail: async () => { throw new Error('Use updateProfile instead'); },
    updatePassword: async () => { throw new Error('Use updateProfile instead'); },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
