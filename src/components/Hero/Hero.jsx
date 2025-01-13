import PropTypes from "prop-types";
import "./style.css";

function Hero(props) {
  return <div className="hero text-center">{props.children}</div>;
}

Hero.propTypes = {
  children: PropTypes.node,
};

export default Hero;
