import PropTypes from 'prop-types';  // Import PropTypes for validation
import styles from "../ListItem/style.module.css"; // Import CSS module
import { FaTrashAlt, FaEdit } from "react-icons/fa";

function ListItem({ taskItem, index, handleEdit, handleDelete }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>{taskItem.task}</strong>
        <p>{taskItem.taskDescription}</p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className="edit-button"
          onClick={() => handleEdit(index)}
        >
          <FaEdit className="mb-1"/>
        </button>
        <button
          type="button"
          className="delete-button"
          onClick={() => handleDelete(index)}
        >
          <FaTrashAlt className="mb-1"/>
        </button>
      </div>
    </li>
  );
}

// Add PropTypes validation
ListItem.propTypes = {
  taskItem: PropTypes.shape({
    task: PropTypes.string.isRequired,
    taskDescription: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ListItem;
