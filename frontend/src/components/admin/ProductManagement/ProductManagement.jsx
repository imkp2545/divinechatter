import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import { productApi } from '@api/productApi';
import { useToast } from '@context/ToastContext';
import { useDebounce } from '@hooks/useDebounce';
import Modal from '@components/common/Modal/Modal';
import ProductForm from './ProductForm';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const debouncedSearch = useDebounce(search, 500);
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getProducts({ search: debouncedSearch });
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productApi.deleteProduct(id);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSuccess = () => {
    fetchProducts();
    handleCloseModal();
  };

  return (
    <div className="product-management">
      <div className="management-header">
        <h1 className="management-title">Product Management</h1>

        <div className="header-actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={handleAdd}>
            <FiPlus /> Add Product
          </button>
        </div>
      </div>

      {loading ? (
        <div className="management-loading">
          <div className="loading-spinner">ॐ</div>
          <p>Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="no-data">
          <p>No products found</p>
          <button className="btn-primary" onClick={handleAdd}>
            <FiPlus /> Add First Product
          </button>
        </div>
      ) : (
        <div className="products-admin-grid">
          {products.map((product) => (
            <div key={product._id} className="product-admin-card">
              <div className="product-admin-image">
                {product.images?.[0] ? (
                  <img src={product.images[0].url} alt={product.name} />
                ) : (
                  <div className="product-placeholder">🕉️</div>
                )}
              </div>

              <div className="product-admin-content">
                <h3 className="product-admin-name">{product.name}</h3>
                <p className="product-admin-description">
                  {product.description?.substring(0, 80)}...
                </p>

                <div className="product-admin-meta">
                  <span className={`live-badge ${product.isLive ? 'live' : 'draft'}`}>
                    {product.isLive ? '✓ Live' : '○ Draft'}
                  </span>
                  <span className="feature-count">
                    {product.features?.length || 0} features
                  </span>
                </div>

                <div className="product-admin-actions">
                  <button
                    className="action-btn edit"
                    onClick={() => handleEdit(product)}
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="large"
      >
        <ProductForm
          product={editingProduct}
          onSuccess={handleSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default ProductManagement;