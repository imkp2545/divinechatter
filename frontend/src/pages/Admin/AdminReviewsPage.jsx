import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ReviewManagement from '@components/admin/ReviewManagement/ReviewManagement';
import './Admin.css';

const AdminReviewsPage = () => {
  return (
    <>
      <Helmet>
        <title>Review Management - Admin - Divine Chatter</title>
      </Helmet>

      <div className="admin-page">
        <div className="container-custom">
          <Link to="/admin" className="back-link">
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <ReviewManagement />
        </div>
      </div>
    </>
  );
};

export default AdminReviewsPage;