import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { productApi } from '@api/productApi';
import { useToast } from '@context/ToastContext';
import ProductDetail from '@components/products/ProductDetail/ProductDetail';
import Loader from '@components/common/Loader/Loader';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productApi.getProductBySlug(slug);
      setProduct(data.product);
      setReviews(data.reviews);
    } catch (error) {
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = () => {
    fetchProduct();
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - Divine Chatter</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="product-detail-page">
        <div className="container-custom">
          <ProductDetail
            product={product}
            reviews={reviews}
            onReviewSubmit={handleReviewSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;