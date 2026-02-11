import { Helmet } from 'react-helmet-async';
import FAQSection from '../../components/contact/FAQ/FAQSection';
import './ContentPage.css';

const ContentPage = () => {
  return (
    <>
      <Helmet>
        <title>FAQ - Divine Chatter</title>
        <meta name="description" content="Frequently asked questions about Divine Chatter" />
      </Helmet>

      <div className="content-page page-bg">
        <div className="container-custom">
          <div className="content-header">
            <div className="ornament-line"></div>
            <h1 className="heading-primary text-center">Frequently Asked Questions</h1>
            <p className="text-premium text-center max-w-2xl mx-auto mt-4">
              Find answers to common questions about Divine Chatter and our products
            </p>
            <div className="ornament-line mt-6"></div>
          </div>

          <div className="content-body">
            <FAQSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentPage;