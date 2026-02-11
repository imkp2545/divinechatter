import { useState } from 'react';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import { useAuth } from '@hooks/useAuth';
import { useWishlist } from '@hooks/useWishlist';
import { useToast } from '@context/ToastContext';
import { getImageUrl } from '@utils/helpers';
import ReviewList from '@components/reviews/ReviewList/ReviewList';
import ReviewForm from '@components/reviews/ReviewForm/ReviewForm';
import './ProductDetail.css';

const ProductDetail = ({ product, reviews, onReviewSubmit }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { isAuthenticated } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const toast = useToast();
  const inWishlist = isInWishlist(product._id);

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="product-detail">
      <div className="product-detail-grid">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="gallery-main">
            {product.images && product.images.length > 0 ? (
              <img
                src={getImageUrl(product.images[selectedImage])}
                alt={product.name}
                className="main-image"
              />
            ) : (
              <div className="main-image-placeholder">
                <span>🕉️</span>
              </div>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="gallery-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={getImageUrl(image)} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-detail-title">{product.name}</h1>

          <p className="product-detail-description">{product.description}</p>

          {product.features && product.features.length > 0 && (
            <div className="product-features">
              <h3 className="features-title">Key Features</h3>
              <ul className="features-list">
                {product.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-icon"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="product-actions">
            <button
              className={`action-btn wishlist-action ${inWishlist ? 'active' : ''}`}
              onClick={handleWishlistToggle}
            >
              <FiHeart />
              {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </button>

            <button className="action-btn share-action" onClick={handleShare}>
              <FiShare2 />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="product-reviews-section">
        <h2 className="reviews-section-title">Customer Reviews</h2>

        {isAuthenticated && (
          <div className="review-form-wrapper">
            <ReviewForm productId={product._id} onSubmit={onReviewSubmit} />
          </div>
        )}

        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default ProductDetail;