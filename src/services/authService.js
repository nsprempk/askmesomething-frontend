import api from "./api.js";

// ==========================================
// REGISTER
// ==========================================

export const register = async (name, email, password) => {
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

export const verifyEmail = async (email, otp) => {
  const response = await api.post("/auth/verify-email", {
    email,
    otp,
  });

  return response.data;
};

// ==========================================
// RESEND VERIFICATION OTP
// ==========================================

export const resendVerificationOTP = async (email) => {
  const response = await api.post("/auth/resend-verification-otp", {
    email,
  });

  return response.data;
};

// ==========================================
// FORGOT PASSWORD
// ==========================================

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

// ==========================================
// RESET PASSWORD
// ==========================================

export const resetPassword = async (token, password) => {
  const response = await api.post(`/auth/reset-password/${token}`, {
    password,
  });

  return response.data;
};
