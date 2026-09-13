import { createContext, useContext, useEffect, useState } from "react";

import api from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);

    setUser(user);

    return response.data;
  };

  // ==========================================
  // REGISTER
  // ==========================================
  // Registration now sends OTP.
  // User is NOT logged in until OTP verification.

  const register = async (name, email, password) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    return response.data;
  };

  // ==========================================
  // VERIFY EMAIL
  // ==========================================

  const verifyEmail = async (email, otp) => {
    const response = await api.post("/auth/verify-email", {
      email,
      otp,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);

    setUser(user);

    return response.data;
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  // ==========================================
  // LOAD USER
  // ==========================================

  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/auth/me");

      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem("token");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadUser();
  }, []);

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    user,
    loading,
    login,
    register,
    verifyEmail,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
