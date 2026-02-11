// ================= EMAIL =================

export const isValidEmail = (email = '') => {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  const domain = email.split('@')[1].toLowerCase();

  // allow gmail
  if (domain === 'gmail.com') return true;

  // allow real domain emails (must have at least one dot)
  const parts = domain.split('.');
  if (parts.length < 2) return false;

  // block common fake ones
  if (domain === 'example.com' || domain === 'test.com') return false;

  return true;
};

// ================= PASSWORD =================

export const isStrongPassword = (password = '') => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
};

// ================= LOGIN =================

export const validateLoginForm = (email = '', password = '') => {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter valid Gmail or real domain email';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
};

// ================= SIGNUP =================

export const validateSignupForm = (name = '', email = '', password = '') => {
  const errors = {};

  if (!name.trim() || name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Only Gmail or real domain emails allowed';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'Include at least one uppercase letter';
  } else if (!/[0-9]/.test(password)) {
    errors.password = 'Include at least one number';
  } else if (!/[!@#$%^&*]/.test(password)) {
    errors.password = 'Include at least one special character';
  }

  return errors;
};

// ================= CONTACT =================

export const validateContactForm = (name = '', email = '', message = '') => {
  const errors = {};

  if (!name.trim() || name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter valid Gmail or real domain email';
  }

  if (!message.trim() || message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};

// ================= REVIEW =================

export const validateReviewForm = (rating, comment = '') => {
  const errors = {};

  if (!rating || rating < 1 || rating > 5) {
    errors.rating = 'Please select a rating between 1 and 5';
  }

  if (comment.length > 500) {
    errors.comment = 'Comment must not exceed 500 characters';
  }

  return errors;
};
