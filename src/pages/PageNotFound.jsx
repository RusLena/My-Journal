import { FaExclamationTriangle } from 'react-icons/fa';

const PageNotFound = () => {
  return (
    <section className="page-not-found-container">
      <FaExclamationTriangle className="error-icon" />
      <div className="error-image">
        <img 
          src="https://media.giphy.com/media/A9EcBzd6t8DZe/giphy.gif" 
          alt="404 Not Found Animation"
          className="not-found-gif"
        />
      </div>
      <h1 className="error-message">404 Not Found</h1>
    </section>
  );
};

export default PageNotFound;


