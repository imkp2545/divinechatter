import { Helmet } from 'react-helmet-async';
import SignupForm from '@components/auth/SignupForm/SignupForm';
import './Auth.css';

const SignupPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up - Divine Chatter</title>
      </Helmet>

      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-brand">
            
            <h1 className="auth-brand-title">Divine Chatter</h1>
            <p className="auth-brand-tagline">Connecting Youth to Religion</p>
          </div>
          <SignupForm />
        </div>
      </div>
    </>
  );
};

export default SignupPage;