import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@context/ToastContext';
import { validateSignupForm } from '@utils/validators';
import Button from '@components/common/Button/Button';
import './SignupForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signup } = useAuth();
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

    const validationErrors = validateSignupForm(
      formData.name,
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

      await signup(formData);
      toast.success('OTP sent to your email!');
      navigate('/verify-otp', {
        state: { email: formData.email, from: 'signup' }
      });
    } catch (error) {
      const message =
        error.response?.data?.message || 'Signup failed';
      toast.error(message);
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-header">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join Divine Chatter today</p>
      </div>

      {errors.general && (
        <div className="error-banner">{errors.general}</div>
      )}

      {/* Name */}
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`input-divine ${
            errors.name ? 'input-error' : ''
          }`}
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
        />
        {errors.name && (
          <span className="error-text">{errors.name}</span>
        )}
      </div>

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

      {/* Password with Show / Hide */}
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>

        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className={`input-divine ${
              errors.password ? 'input-error' : ''
            }`}
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
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
        Sign Up
      </Button>

      <div className="auth-footer">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
