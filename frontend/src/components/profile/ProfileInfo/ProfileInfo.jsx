import { useState } from 'react';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { userApi } from '@api/userApi';
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@context/ToastContext';
import Button from '@components/common/Button/Button';
import './ProfileInfo.css';

const ProfileInfo = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || name.trim().length < 2) {
      toast.error('Name must be at least 2 characters');
      return;
    }

    try {
      setLoading(true);
      const data = await userApi.updateProfile({ name: name.trim() });
      updateUser(data.user);
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEditing(false);
  };

  return (
    <div className="profile-info-card">
      <div className="profile-header">
        <h2 className="profile-card-title">Profile Information</h2>
        {!editing && (
          <button className="edit-btn" onClick={() => setEditing(true)}>
            <FiEdit2 /> Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          {editing ? (
            <input
              type="text"
              className="input-divine"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoFocus
            />
          ) : (
            <p className="profile-value">{user?.name}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <p className="profile-value">{user?.email}</p>
          <span className="profile-note">Email cannot be changed</span>
        </div>

        <div className="form-group">
          <label className="form-label">Role</label>
          <p className="profile-value">
            <span className={`role-badge ${user?.role}`}>
              {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
            </span>
          </p>
        </div>

        {editing && (
          <div className="profile-actions">
            <Button type="submit" variant="primary" loading={loading}>
              <FiSave /> Save Changes
            </Button>
            <Button type="button" variant="ghost" onClick={handleCancel}>
              <FiX /> Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileInfo;