import api from './axiosConfig';

export const contactApi = {
  // Submit contact form
  submitContact: async (data) => {
    const response = await api.post('/contact', data);
    return response.data;
  },

  // Get all contacts (Admin)
  getContacts: async () => {
    const response = await api.get('/contact');
    return response.data;
  }
};