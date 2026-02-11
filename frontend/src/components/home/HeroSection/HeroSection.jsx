import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HeroSection.css';
import heroImg from "../../../assets/images/hero-banner.png";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg-pattern"></div>

      <div className="hero-container">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero-badge">Divine Storytelling</span>

          <h1 className="hero-title">
            Connecting Youth to
            <span> Religion </span>
          </h1>

          <p className="hero-description">
            A screen-free interactive storytelling companion that teaches children
            religion, culture, and life values through engaging audio experiences.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn-primary">
              Explore Products
            </Link>
            <Link to="/about" className="btn-outline">
              Learn More
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>1000+</strong>
              <span>Stories</span>
            </div>
            
            <div>
              <strong>100%</strong>
              <span>Screen-Free</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img src={heroImg} alt="Divine Chatter Device" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
