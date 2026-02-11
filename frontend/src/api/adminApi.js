import api from './axiosConfig';

export const adminApi = {
  // Dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // Users
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  updateUserRole: async (id, role) => {
    const response = await api.put(`/admin/users/${id}/role`, { role });
    return response.data;
  },

  updateUserStatus: async (id, isActive) => {
    const response = await api.put(`/admin/users/${id}/status`, { isActive });
    return response.data;
  },

  // Contacts
  getContacts: async () => {
    const response = await api.get('/admin/contacts');
    return response.data;
  },

  // Products
  getAllProductsAdmin: async (params = {}) => {
    const response = await api.get('/admin/products', { params });
    return response.data;
  },

  // Analytics
  getAdminDashboardStats: async () => {
    const response = await api.get('/analytics/admin-dashboard');
    return response.data;
  }
};