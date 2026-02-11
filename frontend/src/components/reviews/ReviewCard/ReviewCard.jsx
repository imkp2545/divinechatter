import { FiStar } from 'react-icons/fi';
import { formatDate } from '@utils/helpers';
import { Link } from 'react-router-dom';
import './ReviewCard.css';

const ReviewCard = ({ review, showProduct = false }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
      />
    ));
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-user">
          <div className="user-avatar">
            {review.user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="user-info">
            <p className="user-name">{review.user?.name || 'Anonymous'}</p>
            <p className="review-date">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <div className="review-rating">{renderStars(review.rating)}</div>
      </div>

      {review.comment && (
        <p className="review-comment">{review.comment}</p>
      )}

      {showProduct && review.product && (
        <Link to={`/products/${review.product.slug}`} className="review-product-link">
          {review.product.images?.[0] && (
            <img
              src={review.product.images[0].url}
              alt={review.product.name}
              className="review-product-image"
            />
          )}
          <span className="review-product-name">{review.product.name}</span>
        </Link>
      )}
    </div>
  );
};

export default ReviewCard;