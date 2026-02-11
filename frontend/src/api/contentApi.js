import api from './axiosConfig';

export const contentApi = {
  // FAQs
  getFaqs: async () => {
    const response = await api.get('/content/faqs');
    return response.data;
  },

  createFaq: async (data) => {
    const response = await api.post('/content/faqs', data);
    return response.data;
  },

  updateFaq: async (id, data) => {
    const response = await api.put(`/content/faqs/${id}`, data);
    return response.data;
  },

  deleteFaq: async (id) => {
    const response = await api.delete(`/content/faqs/${id}`);
    return response.data;
  },

  // Coming Soon
  getComingSoon: async () => {
    const response = await api.get('/content/coming-soon');
    return response.data;
  },

  createComingSoon: async (data) => {
    const response = await api.post('/content/coming-soon', data);
    return response.data;
  },

  updateComingSoon: async (id, data) => {
    const response = await api.put(`/content/coming-soon/${id}`, data);
    return response.data;
  },

  deleteComingSoon: async (id) => {
    const response = await api.delete(`/content/coming-soon/${id}`);
    return response.data;
  }
};