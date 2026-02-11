import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@context/ToastContext';
import { validateLoginForm } from '@utils/validators';
import Button from '@components/common/Button/Button';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(
      formData.email,
      formData.password
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await login(formData);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed';
      toast.error(message);
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">
          Login to your Divine Chatter account
        </p>
      </div>

      {errors.general && (
        <div className="error-banner">{errors.general}</div>
      )}

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`input-divine ${
            errors.email ? 'input-error' : ''
          }`}
          placeholder="yourname@gmail.com"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />
        {errors.email && (
          <span className="error-text">{errors.email}</span>
        )}
      </div>

      {/* Password */}
      <div className="form-group">
        <div className="label-with-link">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <Link to="/forgot-password" className="forgot-link">
            Forgot?
          </Link>
        </div>

        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className={`input-divine ${
              errors.password ? 'input-error' : ''
            }`}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {errors.password && (
          <span className="error-text">
            {errors.password}
          </span>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={loading}
      >
        Login
      </Button>

      <div className="auth-footer">
        <p>
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;