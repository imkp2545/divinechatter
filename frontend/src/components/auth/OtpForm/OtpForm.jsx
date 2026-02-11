import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@context/ToastContext';
import { authApi } from '@api/authApi';
import Button from '@components/common/Button/Button';
import './OtpForm.css';

const OtpForm = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const { verifyOtp } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const fromSignup = location.state?.from === 'signup';

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }

    inputRefs.current[0]?.focus();
  }, [email, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('');
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    try {
      setLoading(true);

      if (fromSignup) {
        await verifyOtp({ email, otp: otpString });
        toast.success('Account verified successfully!');
        navigate('/');
      } else {
        const data = await authApi.verifyForgotOtp({ email, otp: otpString });
        toast.success('OTP verified!');
        navigate('/reset-password', {
          state: { email, resetToken: data.resetToken }
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);

      if (fromSignup) {
        await authApi.signup({ email, resend: true });
      } else {
        await authApi.forgotPassword({ email });
      }

      toast.success('OTP resent successfully!');
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <form className="otp-form" onSubmit={handleSubmit}>
      <div className="auth-form-header">
        <h2 className="auth-title">Verify OTP</h2>
        <p className="auth-subtitle">
          Enter the 6-digit code sent to
          <br />
          <strong>{email}</strong>
        </p>
      </div>

      <div className="otp-inputs" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            className="otp-input"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>

      <Button type="submit" variant="primary" fullWidth loading={loading}>
        Verify OTP
      </Button>

      <div className="otp-footer">
        {timer > 0 ? (
          <p className="timer-text">Resend OTP in {timer}s</p>
        ) : (
          <button
            type="button"
            className="resend-btn"
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? 'Resending...' : 'Resend OTP'}
          </button>
        )}
      </div>
    </form>
  );
};

export default OtpForm;