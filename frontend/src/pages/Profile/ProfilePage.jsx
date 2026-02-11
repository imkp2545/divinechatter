import { Helmet } from 'react-helmet-async';
import ProfileInfo from '@components/profile/ProfileInfo/ProfileInfo';
import NotificationList from '@components/profile/NotificationList/NotificationList';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>My Profile - Divine Chatter</title>
      </Helmet>

      <div className="profile-page">
        <div className="container-custom">
          <div className="page-header">
            <h1 className="page-title">My Profile</h1>
            <p className="page-subtitle">Manage your account settings and notifications</p>
          </div>

          <div className="profile-grid">
            <ProfileInfo />
            <NotificationList />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;