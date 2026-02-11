import { useState, useEffect } from 'react';
import { reviewApi } from '@api/reviewApi';
import ReviewCard from '@components/reviews/ReviewCard/ReviewCard';
import './Testimonials.css';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewApi.getPublicReviews({ limit: 6 });
        setReviews(data.items || []);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading || reviews.length === 0) return null;

  return (
    <section className="testimonials-section">
      <div className="container-custom">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">What Parents Say</h2>
          <p className="section-description">
            Hear from parents who have transformed their children's learning experience.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} showProduct />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;