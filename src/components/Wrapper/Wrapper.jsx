import PropTypes from 'prop-types';
import "./style.css";  // Ensure the styles are applied here

function Wrapper(props) {
  return <main className="wrapper">{props.children}</main>;  // Wrapper the content
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
