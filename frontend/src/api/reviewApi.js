import api from './axiosConfig';

export const reviewApi = {
  // Create review (User)
  createReview: async (data) => {
    const response = await api.post('/reviews', data);
    return response.data;
  },

  // Get public approved reviews
  getPublicReviews: async (params = {}) => {
    const response = await api.get('/reviews/public', { params });
    return response.data;
  },

  // Get all reviews (Admin)
  getAllReviewsAdmin: async (params = {}) => {
    const response = await api.get('/reviews', { params });
    return response.data;
  },

  // Get pending reviews (Admin)
  getPendingReviews: async () => {
    const response = await api.get('/reviews/pending');
    return response.data;
  },

  // Approve review (Admin)
  approveReview: async (id) => {
    const response = await api.put(`/reviews/${id}/approve`);
    return response.data;
  },

  // Delete review (Admin)
  deleteReview: async (id) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  }
};