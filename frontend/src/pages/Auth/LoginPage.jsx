import { Helmet } from 'react-helmet-async';
import LoginForm from '@components/auth/LoginForm/LoginForm';
import './Auth.css';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login - Divine Chatter</title>
      </Helmet>

      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-brand">
            
            <h1 className="auth-brand-title">Divine Chatter</h1>
            <p className="auth-brand-tagline">Connecting Youth to Religion</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;