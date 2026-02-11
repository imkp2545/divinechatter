import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiFilter } from 'react-icons/fi';
import { reviewApi } from '@api/reviewApi';
import { useToast } from '@context/ToastContext';
import { formatDate } from '@utils/helpers';
import ReviewCard from '@components/reviews/ReviewCard/ReviewCard';
import './ReviewManagement.css';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending'); // 'pending', 'approved', 'all'
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchReviews();
  }, [filter, page]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 20
      };

      if (filter !== 'all') {
        params.status = filter;
      }

      const data = await reviewApi.getAllReviewsAdmin(params);
      setReviews(data.items);
      setPagination(data.pagination);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await reviewApi.approveReview(id);
      toast.success('Review approved');
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve review');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await reviewApi.deleteReview(id);
      toast.success('Review deleted');
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete review');
    }
  };

  return (
    <div className="review-management">
      <div className="management-header">
        <h1 className="management-title">Review Management</h1>

        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => {
              setFilter('pending');
              setPage(1);
            }}
          >
            Pending
          </button>
          <button
            className={`filter-tab ${filter === 'approved' ? 'active' : ''}`}
            onClick={() => {
              setFilter('approved');
              setPage(1);
            }}
          >
            Approved
          </button>
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => {
              setFilter('all');
              setPage(1);
            }}
          >
            All
          </button>
        </div>
      </div>

      {loading ? (
        <div className="management-loading">
          <div className="loading-spinner">ॐ</div>
          <p>Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="no-data">
          <p>No reviews found</p>
        </div>
      ) : (
        <>
          <div className="reviews-admin-list">
            {reviews.map((review) => (
              <div key={review._id} className="review-admin-item">
                <ReviewCard review={review} showProduct />

                <div className="review-admin-meta">
                  <span className={`status-badge ${review.status}`}>
                    {review.status}
                  </span>
                  <div className="review-admin-actions">
                    {review.status === 'pending' && (
                      <button
                        className="action-btn success"
                        onClick={() => handleApprove(review._id)}
                        title="Approve"
                      >
                        <FiCheck /> Approve
                      </button>
                    )}
                    <button
                      className="action-btn danger"
                      onClick={() => handleDelete(review._id)}
                      title="Delete"
                    >
                      <FiX /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>

              <span className="pagination-info">
                Page {page} of {pagination.pages}
              </span>

              <button
                className="pagination-btn"
                onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                disabled={page === pagination.pages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewManagement;