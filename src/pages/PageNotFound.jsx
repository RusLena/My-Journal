import { FaExclamationTriangle } from "react-icons/fa";

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
      <h1 className="error-message"> Error 404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </section>
  );
};

export default PageNotFound;
