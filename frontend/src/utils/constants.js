import {
  FaBookOpen,
  FaHandsHelping,
  FaHeart,
  FaGamepad,
  FaShieldAlt,
  FaSeedling
} from "react-icons/fa";

export const APP_NAME = 'Divine Chatter';
export const TAGLINE = 'Connecting Youth to Religion';

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

export const REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved'
};

export const NOTIFICATION_TYPES = {
  REVIEW_APPROVED: 'review_approved',
  GENERAL: 'general'
};

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
  WISHLIST: '/wishlist',
  PROFILE: '/profile',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_REVIEWS: '/admin/reviews',
  ADMIN_CONTACTS: '/admin/contacts',
  ADMIN_CONTENT: '/admin/content'
};

export const BENEFITS = [
  {
    title: 'Screen-Free Learning',
    description: 'No screens, just pure storytelling and interactive learning.',
    icon: FaBookOpen
  },
  {
    title: 'Cultural Connection',
    description: 'Connect children with their roots and spiritual heritage.',
    icon: FaHandsHelping
  },
  {
    title: 'Value-Based Education',
    description: 'Teach morals, ethics, and values through engaging stories.',
    icon: FaHeart
  },
  {
    title: 'Interactive Experience',
    description: 'Voice-based games and quizzes for active participation.',
    icon: FaGamepad
  },
  {
    title: 'Safe Environment',
    description: 'Child-friendly platform with safe and meaningful content.',
    icon: FaShieldAlt
  },
  {
    title: 'Daily Growth',
    description: 'Build positive habits and spiritual learning every day.',
    icon: FaSeedling
  }
];
