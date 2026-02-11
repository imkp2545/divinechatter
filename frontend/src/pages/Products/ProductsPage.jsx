import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiSearch } from 'react-icons/fi';
import { useDebounce } from '@hooks/useDebounce';
import { productApi } from '@api/productApi';
import ProductGrid from '@components/products/ProductGrid/ProductGrid';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getProducts({ search: debouncedSearch });
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Products - Divine Chatter</title>
        <meta
          name="description"
          content="Explore our range of interactive storytelling devices for children."
        />
      </Helmet>

      <div className="products-page">
        <div className="container-custom">
          <div className="products-page-header">
            <div className="page-title-section">
              <h1 className="page-title">Our Products</h1>
              <p className="page-subtitle">
                Discover our range of interactive storytelling devices designed to connect
                children with their spiritual heritage.
              </p>
            </div>

            <div className="search-box-large">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                className="search-input-large"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;