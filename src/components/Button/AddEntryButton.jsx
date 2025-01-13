/*import styles from "../Button/button.module.css";*/
import PropTypes from "prop-types"; // Import PropTypes for validation
import { HiHeart } from "react-icons/hi2";

function Button(props) {
  return (
    <tbody>
      <tr className="table-primary">
        <td colSpan="4">
          <span
            style={{
              color: "black",
              cursor: "pointer",
              fontSize: "150%",
              position: "inherit",
              marginLeft: "10px",
              borderRadius: "5px",
            }}
            onClick={props.onClick}
            className={`${props["data-value"]}`}
            data-value={props["data-value"]}
          >
            Add Entry <HiHeart className="mb-12" />
          </span>
        </td>
      </tr>
    </tbody>
  );
}

// PropTypes validation for the Button component
Button.propTypes = {
  onClick: PropTypes.func.isRequired, 
  "data-value": PropTypes.string.isRequired, 
};

export default Button;
