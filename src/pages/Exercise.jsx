import { useState, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import { Modal } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { FaPlusCircle, FaTrashAlt, FaEdit } from "react-icons/fa";
import backgroundImage from "../assets/exerciseBackground.jpg";
import "../main.css";
import "animate.css";

function Exercise() {
  const localStorageKey = "exerciseEntries";
  const favoriteLinksKey = "favoriteLinks";

  const [entries, setEntries] = useState(() => {
    const storedEntries = localStorage.getItem(localStorageKey);
    try {
      return storedEntries ? JSON.parse(storedEntries) : [];
    } catch (error) {
      console.error("Failed to parse local storage data:", error);
      return [];
    }
  });

  const [favoriteLinks, setFavoriteLinks] = useState(() => {
    const storedLinks = localStorage.getItem(favoriteLinksKey);
    try {
      return storedLinks ? JSON.parse(storedLinks) : [];
    } catch (error) {
      console.error("Failed to parse favorite links data:", error);
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(""); // New state for date
  const [newLink, setNewLink] = useState("");
  const [viewEntry, setViewEntry] = useState(null); // Track entry to view in modal

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(entries));
    localStorage.setItem(favoriteLinksKey, JSON.stringify(favoriteLinks));
  }, [entries, favoriteLinks]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation for duration and distance to ensure they're not negative
    if (duration < 0 || distance < 0) {
      alert("Duration and distance cannot be negative values.");
      return; // Don't submit the form if validation fails
    }

    const newEntry = { workoutType, duration, distance, notes, date };

    if (editIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = newEntry;
      setEntries(updatedEntries);
      setEditIndex(null);
    } else {
      setEntries([...entries, newEntry]);
    }

    // Reset the form
    setWorkoutType("");
    setDuration("");
    setDistance("");
    setNotes("");
    setDate("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setWorkoutType(entries[index].workoutType);
    setDuration(entries[index].duration);
    setDistance(entries[index].distance);
    setNotes(entries[index].notes);
    setDate(entries[index].date);
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleAddFavoriteLink = () => {
    if (newLink) {
      setFavoriteLinks([...favoriteLinks, newLink]);
      setNewLink(""); // Clear the input field
    }
  };

  const handleDeleteLink = (index) => {
    const updatedLinks = favoriteLinks.filter((_, i) => i !== index);
    setFavoriteLinks(updatedLinks);
  };
  const handleViewNotes = (entry) => {
    setViewEntry(entry); // Set the entry to be viewed
  };

  const handleCloseModal = () => {
    setViewEntry(null); // Close the modal
  };

  return (
    <div className="page-background exercise-page"
    style={{
      backgroundImage: `url(${backgroundImage})`
    }}
  >
      <Hero>
        <h1 className="animate__animated animate__rubberBand">
          Track Your Exercise!
        </h1>
      </Hero>
      <div className="container">
        <div className="content">
          <Container>
            <Row className="d-flex flex-column flex-md-row">
              <Col xs={12} md={6} className="entry-form-container">
                <div className="entry-form">
                  <h4 className="heading">Exercise Entry</h4>
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="workoutType">Workout Type</label>
                      <input
                        className="form-control"
                        type="text"
                        id="workoutType"
                        value={workoutType}
                        onChange={(e) => setWorkoutType(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="duration">Duration (min)</label>
                      <input
                        className="form-control"
                        type="number"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        min="0" // Prevent negative values
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="distance">Distance (km)</label>
                      <input
                        className="form-control"
                        type="number"
                        id="distance"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        min="0" // Prevent negative values
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="notes">Notes</label>
                      <textarea
                        className="form-control"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">Date</label>
                      <input
                        className="form-control"
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="add-entry-button">
                      {editIndex !== null ? "Update Entry" : "Add Entry"}{" "}
                      <FaPlusCircle />
                    </button>
                  </form>
                </div>
              </Col>

              {/* Exercise Entries List */}
              <Col xs={12} md={12} className="entry-form-container">
                <div className="entry-form">
                  <h4 className="heading">Exercise List</h4>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th>Workout</th>
                          <th>Duration</th>
                          <th>Distance</th>
                          <th>Date</th>
                          <th>Workout Notes</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.map((entry, index) => (
                          <tr key={index}>
                            <td>{entry.workoutType}</td>
                            <td>{entry.duration} min</td>
                            <td>{entry.distance} km</td>
                            <td>{entry.date}</td>
                            <td
                              className="clickable-cell"
                              onClick={() => handleViewNotes(entry)}
                            >
                              {entry.notes.length > 30
                                ? `${entry.notes.substring(0, 30)}...` // Truncate long notes
                                : entry.notes}
                            </td>
                            <td>
                              <div className="button-container">
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
                        {/* Modal */}
                        {viewEntry && (
                          <Modal show={!!viewEntry} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                              <Modal.Title>Workout Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <p>
                                <strong>Workout Type:</strong>{" "}
                                {viewEntry.workoutType}
                              </p>
                              <p>
                                <strong>Duration:</strong> {viewEntry.duration}{" "}
                                min
                              </p>
                              <p>
                                <strong>Distance:</strong> {viewEntry.distance}{" "}
                                km
                              </p>
                              <p>
                                <strong>Date:</strong> {viewEntry.date}
                              </p>
                              <p>
                                <strong>Notes:</strong> {viewEntry.notes}
                              </p>
                            </Modal.Body>
                            <Modal.Footer>
                              <button
                                onClick={handleCloseModal}
                                className="close-modal-button"
                              >
                                Close
                              </button>
                            </Modal.Footer>
                          </Modal>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>

              {/* Favorite Links Section */}
              <Col xs={12} md={6} className="entry-form-container">
                <div className="entry-form">
                  <h4 className="heading">Favorite Links</h4>
                  <div className="form-group">
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Add a favorite link"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="add-entry-button"
                      onClick={handleAddFavoriteLink}
                    >
                      Add Link <FaPlusCircle />
                    </button>
                  </div>
                  <ul className="favorite-links-list">
                    {favoriteLinks.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link}
                        </a>
                        <button
                          type="button" 
                          onClick={() => handleDeleteLink(index)}
                           className="delete-button"
                        >
                          <FaTrashAlt />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Exercise;
