import { Helmet } from 'react-helmet-async';
import OtpForm from '@components/auth/OtpForm/OtpForm';
import './Auth.css';

const VerifyOtpPage = () => {
  return (
    <>
      <Helmet>
        <title>Verify OTP - Divine Chatter</title>
      </Helmet>

      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-brand">
          
            <h1 className="auth-brand-title">Divine Chatter</h1>
          </div>
          <OtpForm />
        </div>
      </div>
    </>
  );
};

export default VerifyOtpPage;