import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productApi } from '@api/productApi';
import ProductCard from '@components/products/ProductCard/ProductCard';
import SkeletonCard from '@components/common/Loader/SkeletonCard';
import './ProductHighlights.css';

const ProductHighlights = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getProducts();
        setProducts(data.slice(0, 3)); // Show only 3 products
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="product-highlights">
      <div className="container-custom">
        <div className="section-header">
          <span className="section-badge">Our Collection</span>
          <h2 className="section-title">Featured Products</h2>
          <p className="section-description">
            Discover our range of interactive storytelling devices designed to connect children
            with their spiritual heritage.
          </p>
        </div>

        <div className="products-grid">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : products.length > 0 ? (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <div className="no-products">
              <p>No products available at the moment.</p>
            </div>
          )}
        </div>

        <div className="section-footer">
          <Link to="/products" className="btn-outline btn-large">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;