import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiClock, FiCalendar, FiBell, FiArrowDown, FiLock } from 'react-icons/fi';
import { contentApi } from '../../api/contentApi';
import { formatDate } from '../../utils/helpers';
import './ComingSoonPage.css';


const ComingSoonPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComingSoon();
  }, []);

  const fetchComingSoon = async () => {
    try {
      setLoading(true);
      const data = await contentApi.getComingSoon();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch coming soon products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysUntilLaunch = (date) => {
    if (!date) return null;
    const launchDate = new Date(date);
    const today = new Date();
    const diffTime = launchDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Coming Soon - Divine Chatter</title>
        <meta name="description" content="Discover upcoming products from Divine Chatter" />
      </Helmet>

      <div className="coming-soon-page">
        {/* Hero Section */}
        <div className="mysterious-hero">
          <div className="hero-grid-bg"></div>
          <div className="hero-gradient-overlay"></div>
          
          <div className="container-custom">
            <div className="hero-layout">
              
              {/* Left: Mystery Visual */}
              <div className="mystery-visual">
                <div className="sacred-geometry">
                  <div className="geometry-ring ring-1">
                    <div className="ring-segment"></div>
                    <div className="ring-segment"></div>
                    <div className="ring-segment"></div>
                    <div className="ring-segment"></div>
                  </div>
                  <div className="geometry-ring ring-2">
                    <div className="ring-segment"></div>
                    <div className="ring-segment"></div>
                    <div className="ring-segment"></div>
                    <div className="ring-segment"></div>
                  </div>
                  <div className="geometry-ring ring-3">
                    <div className="ring-segment"></div>
                    <div className="ring-segment"></div>
                    <div className="ring-segment"></div>
                    <div className="ring-segment"></div>
                  </div>
                  
                  <div className="center-symbol">
                    <div className="om-container">
                      <svg className="om-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <text x="50" y="70" fontSize="60" textAnchor="middle" fill="currentColor">ॐ</text>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="light-rays">
                    <div className="ray ray-1"></div>
                    <div className="ray ray-2"></div>
                    <div className="ray ray-3"></div>
                    <div className="ray ray-4"></div>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="hero-content">
                <div className="status-indicator">
                  <span className="status-dot"></span>
                  <span className="status-text">In Development</span>
                </div>

                <h1 className="mysterious-title">
                  <span className="title-small">The Sacred</span>
                  <span className="title-main">Journey Awaits</span>
                  <span className="title-subtitle">New Offerings in Preparation</span>
                </h1>

                <p className="mysterious-description">
                  Ancient wisdom is being woven into modern innovation. We are crafting 
                  extraordinary experiences that will bridge tradition with technology, 
                  illuminating young minds with timeless teachings. The revelation approaches.
                </p>

                <div className="stats-minimal">
                  <div className="stat-box">
                    <div className="stat-value">{String(products.length).padStart(2, '0')}</div>
                    <div className="stat-label">Sacred Offerings</div>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-box">
                    <div className="stat-value">
                      {String(products.filter(p => p.expectedDate).length).padStart(2, '0')}
                    </div>
                    <div className="stat-label">Launch Dates</div>
                  </div>
                </div>

                <div className="hero-actions">
                  <button className="btn-primary btn-large" onClick={scrollToProducts}>
                    <span>Explore Timeline</span>
                    <FiArrowDown />
                  </button>
                  <button className="btn-outline btn-large">
                    <FiBell />
                    <span>Stay Tuned</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scroll Prompt */}
            <div className="scroll-prompt" onClick={scrollToProducts}>
              <div className="scroll-line"></div>
              <div className="scroll-text">Scroll to Discover</div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="products-timeline-section" id="products">
          <div className="container-custom">
            
            {/* Section Header */}
            <div className="timeline-intro">
              <div className="intro-line"></div>
              <h2 className="timeline-heading">Upcoming Revelations</h2>
              <p className="timeline-subheading">
                Each offering is crafted with purpose, devotion, and ancient wisdom
              </p>
            </div>

            {/* Products */}
            {loading ? (
              <div className="loading-container">
                <div className="loader-circle">
                  <svg className="loader-svg" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" strokeWidth="3" />
                  </svg>
                </div>
                <p className="loading-message">Preparing the sacred offerings...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="empty-container">
                <div className="empty-icon-circle">
                  <FiLock />
                </div>
                <h3 className="empty-title">The Future Unfolds</h3>
                <p className="empty-message">
                  Divine creations are being prepared in silence. Return soon to witness the revelation.
                </p>
              </div>
            ) : (
              <div className="timeline-grid">
                {products.map((product, index) => (
                  <div 
                    key={product._id} 
                    className="timeline-card"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* Card Number */}
                    <div className="card-index">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Mysterious Veil */}
                    <div className="card-veil">
                      <div className="veil-pattern"></div>
                      <div className="veil-gradient"></div>
                    </div>

                    {/* Status Badge */}
                    <div className="card-status">
                      <FiClock />
                      <span>In Preparation</span>
                    </div>

                    {/* Content */}
                    <div className="card-body">
                      <h3 className="card-title">{product.name}</h3>
                      
                      {product.launchInfo && (
                        <p className="card-description">{product.launchInfo}</p>
                      )}

                      {/* Date & Countdown */}
                      {product.expectedDate && (
                        <div className="card-timeline">
                          <div className="timeline-divider"></div>
                          
                          <div className="expected-date">
                            <FiCalendar className="date-icon" />
                            <span>Expected {formatDate(product.expectedDate)}</span>
                          </div>

                          {getDaysUntilLaunch(product.expectedDate) !== null && (
                            <div className="countdown-display">
                              <div className="countdown-box">
                                <div className="countdown-number">
                                  {getDaysUntilLaunch(product.expectedDate)}
                                </div>
                                <div className="countdown-unit">Days</div>
                              </div>
                              <div className="countdown-label">Until Launch</div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action */}
                      <button className="card-notify">
                        <FiBell />
                        <span>Notify Me</span>
                      </button>
                    </div>

                    {/* Decorative Corners */}
                    <div className="corner-decoration tl"></div>
                    <div className="corner-decoration tr"></div>
                    <div className="corner-decoration bl"></div>
                    <div className="corner-decoration br"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Newsletter CTA */}
            {products.length > 0 && (
              <div className="newsletter-section">
                <div className="newsletter-visual">
                  <div className="bell-container">
                    <div className="bell-icon-wrapper">
                      <FiBell className="bell-icon" />
                    </div>
                    <div className="bell-waves">
                      <span className="wave"></span>
                      <span className="wave"></span>
                      <span className="wave"></span>
                    </div>
                  </div>
                </div>
                
                <div className="newsletter-content">
                  <h3 className="newsletter-title">Stay Informed</h3>
                  <p className="newsletter-text">
                    Be among the first to experience our new sacred offerings. 
                    Enter your email to receive exclusive updates.
                  </p>
                  
                  <form className="newsletter-form">
                    <input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="newsletter-input"
                    />
                    <button type="submit" className="newsletter-submit">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoonPage;