import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import UserManagement from '@components/admin/UserManagement/UserManagement';
import './Admin.css';

const AdminUsersPage = () => {
  return (
    <>
      <Helmet>
        <title>User Management - Admin - Divine Chatter</title>
      </Helmet>

      <div className="admin-page">
        <div className="container-custom">
          <Link to="/admin" className="back-link">
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <UserManagement />
        </div>
      </div>
    </>
  );
};

export default AdminUsersPage;