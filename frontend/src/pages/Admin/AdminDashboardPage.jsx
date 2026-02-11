import { Helmet } from 'react-helmet-async';
import AdminDashboard from '@components/admin/Dashboard/AdminDashboard';
import './Admin.css';

const AdminDashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Divine Chatter</title>
      </Helmet>

      <div className="admin-page">
        <div className="container-custom">
          <AdminDashboard />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;