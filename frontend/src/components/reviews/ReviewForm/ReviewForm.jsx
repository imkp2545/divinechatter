import { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { reviewApi } from '@api/reviewApi';
import { useToast } from '@context/ToastContext';
import { validateReviewForm } from '@utils/validators';
import Button from '@components/common/Button/Button';
import './ReviewForm.css';

const ReviewForm = ({ productId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateReviewForm(rating, comment);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await reviewApi.createReview({
        productId,
        rating,
        comment
      });

      toast.success('Review submitted for approval!');
      setRating(0);
      setComment('');

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-form-title">Write a Review</h3>

      <div className="form-group">
        <label className="form-label">Your Rating *</label>
        <div className="rating-input">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="star-btn"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
            >
              <FiStar
                className={`star ${
                  star <= (hoveredRating || rating) ? 'filled' : ''
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && <span className="error-text">{errors.rating}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="comment" className="form-label">
          Your Review (Optional)
        </label>
        <textarea
          id="comment"
          className="input-divine"
          rows="4"
          placeholder="Share your experience with this product..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength="500"
        />
        <div className="char-count">
          {comment.length}/500 characters
        </div>
        {errors.comment && <span className="error-text">{errors.comment}</span>}
      </div>

      <Button type="submit" variant="primary" fullWidth loading={loading}>
        Submit Review
      </Button>

      <p className="review-note">
        Your review will be published after admin approval.
      </p>
    </form>
  );
};

export default ReviewForm;