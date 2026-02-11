import './Loader.css';

const Loader = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <div className="om-loader">
          <div className="om-ring"></div>
          <div className="om-symbol">ॐ</div>
        </div>
        <p className="loader-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div className="om-loader">
        <div className="om-ring"></div>
        <div className="om-symbol">ॐ</div>
      </div>
    </div>
  );
};

export default Loader;
