import { Link } from 'react-router-dom';
import { FiHeart, FiEye } from 'react-icons/fi';
import { useAuth } from '@hooks/useAuth';
import { useWishlist } from '@hooks/useWishlist';
import { getImageUrl } from '@utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
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

  const productImage = product.images?.[0] ? getImageUrl(product.images[0]) : null;

  return (
    <div className="product-card">
      <Link to={`/products/${product.slug}`} className="product-card-link">
        <div className="product-image-wrapper">
          {productImage ? (
            <img src={productImage} alt={product.name} className="product-image" />
          ) : (
            <div className="product-image-placeholder">
              <span>🕉️</span>
            </div>
          )}
          <div className="product-overlay">
            <FiEye className="overlay-icon" />
            <span>View Details</span>
          </div>
        </div>

        <div className="product-content">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">
            {product.description?.substring(0, 100)}
            {product.description?.length > 100 ? '...' : ''}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="product-features-preview">
              <span className="feature-tag">{product.features[0]}</span>
              {product.features.length > 1 && (
                <span className="feature-count">+{product.features.length - 1} more</span>
              )}
            </div>
          )}
        </div>
      </Link>

      <button
        className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
        onClick={handleWishlistToggle}
        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <FiHeart />
      </button>
    </div>
  );
};

export default ProductCard;