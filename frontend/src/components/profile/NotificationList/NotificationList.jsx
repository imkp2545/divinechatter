import { useState, useEffect } from 'react';
import { FiBell, FiCheck } from 'react-icons/fi';
import { userApi } from '@api/userApi';
import { useToast } from '@context/ToastContext';
import { formatDate, formatTime } from '@utils/helpers';
import './NotificationList.css';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await userApi.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await userApi.markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((notif) => (notif._id === id ? { ...notif, read: true } : notif))
      );
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to update notification');
    }
  };

  if (loading) {
    return (
      <div className="notifications-card">
        <h2 className="profile-card-title">Notifications</h2>
        <div className="notifications-loading">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="notifications-card">
      <div className="notifications-header">
        <h2 className="profile-card-title">Notifications</h2>
        <span className="notification-count">
          {notifications.filter((n) => !n.read).length} unread
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="no-notifications">
          <FiBell className="no-notif-icon" />
          <p>No notifications yet</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-content">
                <h4 className="notification-title">{notification.title}</h4>
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">
                  {formatDate(notification.createdAt)} at {formatTime(notification.createdAt)}
                </span>
              </div>

              {!notification.read && (
                <button
                  className="mark-read-btn"
                  onClick={() => markAsRead(notification._id)}
                  title="Mark as read"
                >
                  <FiCheck />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;