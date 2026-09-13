import api from "./api.js";

// Forgot password
export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

// Reset password
export const resetPassword = async (token, password) => {
  const response = await api.post(`/auth/reset-password/${token}`, {
    password,
  });

  return response.data;
};
