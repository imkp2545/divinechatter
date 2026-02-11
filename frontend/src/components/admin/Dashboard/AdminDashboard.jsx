import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiShoppingBag, FiStar, FiMail, FiEye, FiFileText } from 'react-icons/fi';
import { adminApi } from '../../../api/adminApi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: FiUsers,
      color: 'blue',
      link: '/admin/users'
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: FiShoppingBag,
      color: 'green',
      link: '/admin/products'
    },
    {
      title: 'Pending Reviews',
      value: stats?.pendingReviews || 0,
      icon: FiStar,
      color: 'yellow',
      link: '/admin/reviews'
    },
    {
      title: 'Total Visitors',
      value: stats?.totalVisitors || 0,
      icon: FiEye,
      color: 'purple',
      link: '#'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: FiUsers,
      link: '/admin/users',
      color: 'blue'
    },
    {
      title: 'Manage Products',
      description: 'Add, edit, or remove products',
      icon: FiShoppingBag,
      link: '/admin/products',
      color: 'green'
    },
    {
      title: 'Review Moderation',
      description: 'Approve or reject reviews',
      icon: FiStar,
      link: '/admin/reviews',
      color: 'yellow'
    },
    {
      title: 'Contact Messages',
      description: 'View customer inquiries',
      icon: FiMail,
      link: '/admin/contacts',
      color: 'pink'
    },
    {
      title: 'Content Management',
      description: 'Manage FAQs and Coming Soon',
      icon: FiFileText,
      link: '/admin/content',
      color: 'orange'
    }
  ];

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        <div className="loading-spinner">ॐ</div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's your overview</p>
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className={`stat-card stat-${stat.color}`}
          >
            <div className="stat-icon">
              <stat.icon />
            </div>
            <div className="stat-content">
              <p className="stat-label">{stat.title}</p>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className={`action-card action-${action.color}`}>
              <div className="action-icon-wrapper">
                <action.icon className="action-icon" />
              </div>
              <div className="action-content">
                <h3 className="action-title">{action.title}</h3>
                <p className="action-description">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;