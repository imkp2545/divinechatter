import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ContentManagement from '../../components/admin/ContentManagement/ContentManagement';
import './Admin.css';

const AdminContentPage = () => {
  return (
    <>
      <Helmet>
        <title>Content Management - Admin - Divine Chatter</title>
      </Helmet>

      <div className="admin-page">
        <div className="container-custom">
          <Link to="/admin" className="back-link">
            <FiArrowLeft /> Back to Dashboard
          </Link>

          <ContentManagement />
        </div>
      </div>
    </>
  );
};

export default AdminContentPage;