import api from './axiosConfig';

export const userApi = {
  // Get current user
  getMe: async () => {
    const response = await api.get('/user/me');
    return response.data;
  },

  // Update profile
  updateProfile: async (data) => {
    const response = await api.put('/user/profile', data);
    return response.data;
  },

  // Get notifications
  getNotifications: async () => {
    const response = await api.get('/user/notifications');
    return response.data;
  },

  // Mark notification as read
  markNotificationRead: async (id) => {
    const response = await api.put(`/user/notifications/${id}/read`);
    return response.data;
  }
};