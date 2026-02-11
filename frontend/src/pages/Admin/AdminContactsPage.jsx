import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ContactManagement from '@components/admin/ContactManagement/ContactManagement';
import './Admin.css';

const AdminContactsPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Management - Admin - Divine Chatter</title>
      </Helmet>

      <div className="admin-page">
        <div className="container-custom">
          <Link to="/admin" className="back-link">
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <ContactManagement />
        </div>
      </div>
    </>
  );
};

export default AdminContactsPage;