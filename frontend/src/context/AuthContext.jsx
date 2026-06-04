import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('acs_user');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });
  const [loading] = useState(false);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.status === 200) {
      // Use user data from login response directly (cookies may be blocked cross-domain)
      let userData = response.data.user;
      if (!userData) {
        try {
          const profileRes = await api.get('/auth/me');
          userData = profileRes.data.user;
        } catch {
          userData = { email };
        }
      }
      setUser(userData);
      localStorage.setItem('acs_user', JSON.stringify(userData));
      return true;
    }
  };

  const logout = async () => {
    try {
      await api.delete('/auth/logout');
    } catch (err) {
      console.error('Logout failed', err);
    }
    setUser(null);
    localStorage.removeItem('acs_user');
  };

  const checkAuth = async () => {
    try {
      const res = await api.get('/auth/me');
      const userData = res.data.user;
      setUser(userData);
      localStorage.setItem('acs_user', JSON.stringify(userData));
      return userData;
    } catch {
      return null;
    }
  };

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.status === 201 || response.status === 200) {
      // Use user data from register response directly (cookies may be blocked cross-domain)
      let registeredUser = response.data.user;
      if (!registeredUser) {
        // Try /auth/me as fallback (works when cookies are set, e.g. same-domain)
        try {
          const profileRes = await api.get('/auth/me');
          registeredUser = profileRes.data.user;
        } catch {
          registeredUser = { name: userData.name, email: userData.email, phoneNumber: userData.phoneNumber, status: 'verified' };
        }
      }
      setUser(registeredUser);
      localStorage.setItem('acs_user', JSON.stringify(registeredUser));
    }
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
      } catch {
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
    checkAuth,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
