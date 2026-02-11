import { useState } from 'react';
import { contactApi } from '@api/contactApi';
import { useToast } from '@context/ToastContext';
import { validateContactForm } from '@utils/validators';
import Button from '@components/common/Button/Button';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateContactForm(
      formData.name,
      formData.email,
      formData.message
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await contactApi.submitContact(formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`input-divine ${errors.name ? 'input-error' : ''}`}
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`input-divine ${errors.email ? 'input-error' : ''}`}
          placeholder="yourname@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Your Message *
        </label>
        <textarea
          id="message"
          name="message"
          className={`input-divine ${errors.message ? 'input-error' : ''}`}
          rows="6"
          placeholder="Tell us how we can help you..."
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <span className="error-text">{errors.message}</span>}
      </div>

      <Button type="submit" variant="primary" fullWidth loading={loading}>
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;