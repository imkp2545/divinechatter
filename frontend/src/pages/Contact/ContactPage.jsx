import { Helmet } from 'react-helmet-async';
import { FiMail } from 'react-icons/fi';
import ContactForm from '@components/contact/ContactForm/ContactForm';
import FAQSection from '@components/contact/FAQ/FAQSection';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Divine Chatter</title>
        <meta name="description" content="Get in touch with Divine Chatter team" />
      </Helmet>

      <div className="contact-page">
        <div className="container-custom">
          <div className="page-header">
            <h1 className="page-title">Contact Us</h1>
            <p className="page-subtitle">
              Have a question or need support? Our team is always ready to help you.
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-info-section">
              <h2 className="section-title">Reach Us Anytime</h2>

              <div className="contact-info-cards">
                <div className="contact-info-card">
                  <div className="info-icon">
                    <FiMail />
                  </div>
                  <h3>Email Support</h3>
                  <p>care.divinechatter@gmail.com</p>
                  
                </div>
              </div>
            </div>

            <ContactForm />
          </div>

          <FAQSection />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
