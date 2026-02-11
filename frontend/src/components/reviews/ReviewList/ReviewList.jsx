import ReviewCard from '../ReviewCard/ReviewCard';
import './ReviewList.css';

const ReviewList = ({ reviews, showProduct = false }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="no-reviews">
        <div className="no-reviews-icon">💬</div>
        <p>No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} showProduct={showProduct} />
      ))}
    </div>
  );
};

export default ReviewList;