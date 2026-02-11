import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useWishlist } from '@hooks/useWishlist';
import WishlistGrid from '@components/wishlist/WishlistGrid/WishlistGrid';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlist, loading, removeFromWishlist } = useWishlist();

  return (
    <>
      <Helmet>
        <title>My Wishlist - Divine Chatter</title>
      </Helmet>

      <div className="wishlist-page">
        <div className="container-custom">
          <div className="page-header">
            <h1 className="page-title">My Wishlist</h1>
            <p className="page-subtitle">
              {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          <WishlistGrid items={wishlist} onRemove={removeFromWishlist} loading={loading} />

          {!loading && wishlist.length > 0 && (
            <div className="wishlist-footer">
              <Link to="/products" className="btn-outline btn-large">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;