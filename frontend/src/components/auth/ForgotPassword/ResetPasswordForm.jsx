import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '@api/authApi';
import { useToast } from '@context/ToastContext';
import { isStrongPassword } from '@utils/validators';
import Button from '@components/common/Button/Button';

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const resetToken = location.state?.resetToken;

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

    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (!isStrongPassword(formData.newPassword)) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await authApi.resetPassword({
        email,
        resetToken,
        newPassword: formData.newPassword
      });

      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to reset password';
      toast.error(message);
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-header">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">Enter your new password</p>
      </div>

      {errors.general && (
        <div className="error-banner">{errors.general}</div>
      )}

      {/* New Password */}
      <div className="form-group">
        <label htmlFor="newPassword" className="form-label">
          New Password
        </label>

        <div className="password-wrapper">
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="newPassword"
            name="newPassword"
            className={`input-divine ${
              errors.newPassword ? 'input-error' : ''
            }`}
            placeholder="At least 8 characters"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowNewPassword((prev) => !prev)
            }
          >
            {showNewPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {errors.newPassword && (
          <span className="error-text">
            {errors.newPassword}
          </span>
        )}
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>

        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            className={`input-divine ${
              errors.confirmPassword ? 'input-error' : ''
            }`}
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowConfirmPassword((prev) => !prev)
            }
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {errors.confirmPassword && (
          <span className="error-text">
            {errors.confirmPassword}
          </span>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={loading}
      >
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
