import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import './ComingSoonBanner.css';

const ComingSoonBanner = () => {
  return (
    <section className="coming-soon-banner">
      <div className="banner-glow"></div>
      <div className="container-custom">
        <div className="banner-content">
          <div className="banner-icon">
            <div className="icon-ring"></div>
            <FiClock className="clock-icon" />
          </div>
          
          <div className="banner-text">
            <h3 className="banner-title">Sacred Offerings on the Horizon</h3>
            <p className="banner-subtitle">
              New divine experiences are being crafted. Discover what's coming soon.
            </p>
          </div>

          <Link to="/coming-soon" className="banner-cta">
            <span>Explore Timeline</span>
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonBanner;