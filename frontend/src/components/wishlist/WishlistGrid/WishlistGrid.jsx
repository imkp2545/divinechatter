import WishlistItem from '../WishlistItem/WishlistItem';
import { FiHeart } from 'react-icons/fi';
import './WishlistGrid.css';

const WishlistGrid = ({ items, onRemove, loading }) => {
  if (loading) {
    return (
      <div className="wishlist-loading">
        <div className="loader"></div>
        <p>Loading your wishlist...</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="empty-wishlist">
        <div className="empty-icon">
          <FiHeart />
        </div>
        <h3>Your Wishlist is Empty</h3>
        <p>Start adding products you love!</p>
      </div>
    );
  }

  return (
    <div className="wishlist-grid">
      {items.map((item) => (
        <WishlistItem key={item._id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default WishlistGrid;
