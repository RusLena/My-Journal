import PropTypes from 'prop-types';  // Import PropTypes
import './style.css';

function Hero(props) {
  return (
    <div className="hero text-center" style={{ backgroundImage: `url(${props.backgroundImage})` }}>
      {props.children}
    </div>
  );
}

// Add PropTypes validation
Hero.propTypes = {
  backgroundImage: PropTypes.string.isRequired, // backgroundImage should be a string (URL)
  children: PropTypes.node, // children can be any renderable content (optional)
};

export default Hero;
