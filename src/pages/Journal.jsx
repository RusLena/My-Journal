import { useState, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { FaPlusCircle, FaTrashAlt, FaEdit } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import backgroundImage from "../assets/journalBackground.jpg";
import "../main.css";
import "animate.css";

function Journal() {
  const localStorageKey = "journalEntries";

  const [entries, setEntries] = useState(() => {
    const storedEntries = localStorage.getItem(localStorageKey);
    try {
      return storedEntries ? JSON.parse(storedEntries) : [];
    } catch (error) {
      console.error("Failed to parse local storage data:", error);
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(""); // New state for date
  const [viewEntry, setViewEntry] = useState(null);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(entries));
  }, [entries]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newEntry = { title, content, date };

    if (editIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = newEntry;
      setEntries(updatedEntries);
      setEditIndex(null);
    } else {
      setEntries([...entries, newEntry]);
    }

    // Reset the form
    setTitle("");
    setContent("");
    setDate(""); 
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(entries[index].title);
    setContent(entries[index].content);
    setDate(entries[index].date); 
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };
  
  const handleViewContent = (entry) => {
    setViewEntry(entry); 
  };

  const handleCloseModal = () => {
    setViewEntry(null); 
  };

  return (
    <div className="page-background journal-page"
    style={{
      backgroundImage: `url(${backgroundImage})`
    }}
  >
      <Hero>
        <h1 className="animate__animated animate__rubberBand">Welcome to Your Journal!</h1>
      </Hero>
      <div className="container">
        <div className="content">
          <Container>
            <Row className="d-flex flex-column flex-md-row">
              <Col xs={12} md={12} className="entry-form-container">
                <div className="entry-form">
                  <h4 className="heading">Journal Entries</h4>
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        className="form-control"
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="content">Content</label>
                      <textarea
                        className="form-control"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
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
                      {editIndex !== null ? "Update Entry" : "Add Entry"} <FaPlusCircle />
                    </button>
                  </form>
                </div>
              </Col>
              <Col xs={12} md={12} className="entry-form-container">
                <div className="entry-list-container">
                  <h4 className="heading">Journal List</h4>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th className="heading">Title</th>
                          <th className="heading">Content</th>
                          <th className="heading">Date</th>
                          <th className="heading">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.map((entry, index) => (
                          <tr key={index}>
                            <td className="larger-cell">{entry.title}</td>
                            <td className="larger-cell clickable-cell" 
                             onClick={() => handleViewContent(entry)} 
                             >
                              {entry.content.length > 50
                                ? `${entry.content.substring(0, 50)}...`
                                : entry.content}</td>
                            <td>{entry.date}</td> 
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
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Modal for viewing full content */}
      {viewEntry && (
        <Modal show={!!viewEntry} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{viewEntry.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{viewEntry.content}</p>
            <p><strong>Date:</strong> {viewEntry.date}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Social Media Links */}
      <div className="social-media-section">
        <div className="social-links">
          <a className="link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} />
          </a>
          <a className="link" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} />
          </a>
          <a className="link" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
          </a>
          <a className="link" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Journal;
