import ProductCard from '../ProductCard/ProductCard';
import SkeletonCard from '@components/common/Loader/SkeletonCard';
import './ProductGrid.css';

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="no-products-message">
        <div className="no-products-icon">🔍</div>
        <h3>No Products Found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;