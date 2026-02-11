import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import logo from '../../../assets/images/Logo-Banner.png';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container-custom">
          <div className="footer-grid">

            {/* Brand */}
            <div className="footer-col">
              <div className="footer-brand">

                <div className="footer-logo">
                  <img
                    src={logo}
                    alt="Divine Chatter Logo"
                    className="footer-logo-img"
                  />
                </div>



                <p className="footer-description">
                  An interactive, screen-free storytelling companion for children that teaches
                  religion, values, and culture through voice-based stories and games.
                </p>
              </div>

              <div className="footer-social">
                <a href="https://www.linkedin.com/company/divine-chatter/about/" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin /></a>
                <a href="https://www.instagram.com/divine.chatter25" target="_blank" rel="noopener noreferrer" className="social-link"><FaInstagram /></a>
                <a href="https://www.youtube.com/@divinechatter-c2m" target="_blank" rel="noopener noreferrer" className="social-link"><FaYoutube /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/coming-soon">Coming Soon</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-col">
              <h3 className="footer-title">Customer Service</h3>
              <ul className="footer-links">
                <li><Link to="/contact">Help & Support</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h3 className="footer-title">Get In Touch</h3>
              <ul className="footer-contact">
                <li>
                  <strong>Email:</strong><br></br>
                  <a href="mailto:care.divinechatter@gmail.com">
                    care.divinechatter@gmail.com
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container-custom">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} Divine Chatter. All rights reserved.
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
