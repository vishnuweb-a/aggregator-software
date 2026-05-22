import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Persist user across page refresh using localStorage
    try {
      const stored = localStorage.getItem('acs_user');
      if (stored) setUser(JSON.parse(stored));
    } catch (_) {}
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.status === 200) {
      // Try to fetch full user profile
      try {
        const profileRes = await api.get('/auth/me');
        const userData = profileRes.data.user;
        setUser(userData);
        localStorage.setItem('acs_user', JSON.stringify(userData));
      } catch (_) {
        const userData = { email };
        setUser(userData);
        localStorage.setItem('acs_user', JSON.stringify(userData));
      }
      return true;
    }
  };

  const logout = async () => {
    try {
      await api.delete('/auth/logout');
    } catch (_) {}
    setUser(null);
    localStorage.removeItem('acs_user');
  };

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  };

  const validateOtp = async (email, otp) => {
    const response = await api.post('/auth/validate', { email, otp });
    // After successful OTP validation, auto-login the user
    if (response.status === 200) {
      try {
        const profileRes = await api.get('/auth/me');
        const userData = profileRes.data.user;
        setUser(userData);
        localStorage.setItem('acs_user', JSON.stringify(userData));
      } catch (_) {
        const userData = { email };
        setUser(userData);
        localStorage.setItem('acs_user', JSON.stringify(userData));
      }
    }
    return response.data;
  };

  const forgotPassword = async (email) => {
    const response = await api.post('/auth/forgotpassword', { email });
    return response.data;
  };

  const verifyForgotOtp = async (email, otp) => {
    const response = await api.post('/auth/verifyotp', { email, otp: Number(otp) });
    return response.data;
  };

  const changePassword = async (email, password) => {
    const response = await api.post('/auth/changepassword', { email, password });
    return response.data;
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    register,
    validateOtp,
    forgotPassword,
    verifyForgotOtp,
    changePassword,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
