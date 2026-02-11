import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { contentApi } from '../../../api/contentApi';
import './FAQSection.css';

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contentApi.getFaqs();
      setFaqs(data);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
      setError('Unable to load FAQs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="faq-loading">
        <div className="loading-spinner-sacred">
          <div className="spinner-om">ॐ</div>
        </div>
        <p className="loading-text">Loading wisdom...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="faq-error">
        <p>{error}</p>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="faq-empty">
        <div className="empty-icon">📿</div>
        <p>No FAQs available at the moment</p>
      </div>
    );
  }

  return (
    <div className="faq-section">
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={faq._id}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              <span className="faq-question-text">{faq.question}</span>
              <span className="faq-icon">
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </button>

            {activeIndex === index && (
              <div className="faq-answer">
                <div className="answer-ornament"></div>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;