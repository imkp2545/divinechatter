import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import ForgotPassword from '@components/auth/ForgotPassword/ForgotPassword';
import ResetPasswordForm from '@components/auth/ForgotPassword/ResetPasswordForm';
import './Auth.css';

const ForgotPasswordPage = () => {
  const location = useLocation();
  const isResetPassword = location.pathname === '/reset-password';

  return (
    <>
      <Helmet>
        <title>{isResetPassword ? 'Reset Password' : 'Forgot Password'} - Divine Chatter</title>
      </Helmet>

      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-brand">
            
            <h1 className="auth-brand-title">Divine Chatter</h1>
          </div>
          {isResetPassword ? <ResetPasswordForm /> : <ForgotPassword />}
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;