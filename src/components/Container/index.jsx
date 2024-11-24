import PropTypes from 'prop-types';

function Container({ style, children }) {
  return <div className="container" style={style}>{children}</div>;
}

Container.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Container;

