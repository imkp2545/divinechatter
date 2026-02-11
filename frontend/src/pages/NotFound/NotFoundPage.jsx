import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import './NotFound.css';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Divine Chatter</title>
      </Helmet>

      <div className='not-found-page'>
        <div className='not-found-content'>
          <div className='not-found-icon'>ॐ</div>
          <h1 className='not-found-title'>404</h1>
          <h2 className='not-found-subtitle'>Path Not Found</h2>
          <p className='not-found-text'>
            The page you seek does not exist in this realm. Perhaps it was moved to another dimension or never existed.
          </p>

          <div className='not-found-actions'>
            <Link to='/' className='btn-primary btn-large'>
              <FiHome /> Return Home
            </Link>
            <button onClick={() => window.history.back()} className='btn-outline btn-large'>
              <FiArrowLeft /> Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;