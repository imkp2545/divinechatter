import { Link } from 'react-router-dom';
import { FiX, FiEye } from 'react-icons/fi';
import { getImageUrl } from '@utils/helpers';
import './WishlistItem.css';

const WishlistItem = ({ item, onRemove }) => {
  const product = item.product;

  if (!product) {
    return null;
  }

  const productImage = product.images?.[0] ? getImageUrl(product.images[0]) : null;

  return (
    <div className="wishlist-item">
      <Link to={`/products/${product.slug}`} className="wishlist-item-link">
        <div className="wishlist-item-image">
          {productImage ? (
            <img src={productImage} alt={product.name} />
          ) : (
            <div className="wishlist-image-placeholder">
              <span>🕉️</span>
            </div>
          )}
        </div>

        <div className="wishlist-item-content">
          <h3 className="wishlist-item-title">{product.name}</h3>
          <p className="wishlist-item-description">
            {product.description?.substring(0, 120)}
            {product.description?.length > 120 ? '...' : ''}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="wishlist-features">
              {product.features.slice(0, 2).map((feature, index) => (
                <span key={index} className="wishlist-feature-tag">
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="feature-count">+{product.features.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </Link>

      <div className="wishlist-item-actions">
        <Link to={`/products/${product.slug}`} className="view-btn" title="View Details">
          <FiEye />
        </Link>
        <button
          className="remove-btn"
          onClick={() => onRemove(product._id)}
          title="Remove from wishlist"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;