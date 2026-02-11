import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '@api/authApi';
import { useToast } from '@context/ToastContext';
import { isValidEmail } from '@utils/validators';
import Button from '@components/common/Button/Button';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email address');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await authApi.forgotPassword({ email });
      toast.success('OTP sent to your email!');
      navigate('/verify-otp', { state: { email, from: 'forgot' } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
      setError(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-header">
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-subtitle">
          Enter your email and we'll send you an OTP to reset your password
        </p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`input-divine ${error ? 'input-error' : ''}`}
          placeholder="yourname@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          autoComplete="email"
        />
        {error && <span className="error-text">{error}</span>}
      </div>

      <Button type="submit" variant="primary" fullWidth loading={loading}>
        Send OTP
      </Button>

      <div className="auth-footer">
        <p>
          Remember your password?{' '}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ForgotPassword;