import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ProductManagement from '@components/admin/ProductManagement/ProductManagement';
import './Admin.css';

const AdminProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>Product Management - Admin - Divine Chatter</title>
      </Helmet>

      <div className="admin-page">
        <div className="container-custom">
          <Link to="/admin" className="back-link">
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <ProductManagement />
        </div>
      </div>
    </>
  );
};

export default AdminProductsPage;