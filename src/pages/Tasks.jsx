import { useState, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import { Container, Row, Col } from "react-bootstrap";
import { FaPlusCircle, FaTrashAlt, FaEdit, FaCheck } from "react-icons/fa";
import "../main.css";
import "animate.css";

function Tasks() {
  const localStorageKey = "tasks";

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(localStorageKey);
    try {
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error("Failed to parse local storage data:", error);
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
  }, [tasks]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newTask = { title: taskTitle, dueDate, isCompleted };

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    // Reset the form
    setTaskTitle("");
    setDueDate("");
    setIsCompleted(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTaskTitle(tasks[index].title);
    setDueDate(tasks[index].dueDate);
    setIsCompleted(tasks[index].isCompleted);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  };

  return (
    <div className="page-background task-page">
      <Hero>
        <h1 className="animate__animated animate__rubberBand">Manage Your Tasks</h1>
      </Hero>
      <div className="container">
        <div className="content">
          <Container>
            <Row>
              <Col>
                <div className="entry-form">
                  <h4 className="heading">Tasks</h4>
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="taskTitle">Task</label>
                      <input
                        className="form-control"
                        type="text"
                        id="taskTitle"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dueDate">Due Date</label>
                      <input
                        className="form-control"
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="add-task-button">
                      {editIndex !== null ? "Update Task" : "Add Task"} <FaPlusCircle />
                    </button>
                  </form>
                </div>
              </Col>
              <Col>
                <div className="entry-list-container">
                  <h4 className="heading">Task List</h4>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th className="heading">Task</th>
                          <th className="heading">Due Date</th>
                          <th className="heading">Status</th>
                          <th className="heading">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((task, index) => (
                          <tr key={index} className={task.isCompleted ? "completed-task" : ""}>
                            <td>{task.title}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.isCompleted ? "Completed" : "Pending"}</td>
                            <td>
                              <div className="button-container">
                                <button
                                  type="button"
                                  className="complete-button"
                                  onClick={() => toggleCompletion(index)}
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  type="button"
                                  className="edit-button"
                                  onClick={() => handleEdit(index)}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  type="button"
                                  className="delete-button"
                                  onClick={() => handleDelete(index)}
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
