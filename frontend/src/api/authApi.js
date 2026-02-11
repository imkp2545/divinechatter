import api from './axiosConfig';

export const authApi = {
  // Signup
  signup: async (data) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  // Verify Signup OTP
  verifySignupOtp: async (data) => {
    const response = await api.post('/auth/verify-signup-otp', data);
    return response.data;
  },

  // Login
  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  // Forgot Password
  forgotPassword: async (data) => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  // Verify Forgot OTP
  verifyForgotOtp: async (data) => {
    const response = await api.post('/auth/verify-forgot-otp', data);
    return response.data;
  },

  // Reset Password
  resetPassword: async (data) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  }
};