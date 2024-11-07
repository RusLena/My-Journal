import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Row from "../components/Row";
import Col from "../components/Col";
import { Container } from "react-bootstrap";
import EntryForm from "../components/Entry/EntryForm";
import EntryList from "../components/Entry/EntryList";
import "../index.css";
import "animate.css";

function Journal() {
  const localStorageKey = "journalEntries"; // Retrieve entries from local storage
  const [entries, setEntries] = useState(() => {
    const storedEntries = localStorage.getItem(localStorageKey);
    return storedEntries ? JSON.parse(storedEntries) : [];
  }); // track the entry being edited
  const [editIndex, setEditIndex] = useState(null); // Update local storage
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(entries));
  }, [entries]);
  const addEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
  };
  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((entry, i) => i !== index);
    setEntries(updatedEntries);
  };
  const editEntry = (index, updatedEntry) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = updatedEntry;
    setEntries(updatedEntries);
    setEditIndex(null);
  };
  return (
    <div className="journal-background">
      <Hero>
        <h1 className="animate__animated animate__rubberBand">
          Welcome to Your personal Journal
        </h1>
      </Hero>
      <div className="container">
        <div className="content">
          <Container>
            <Row>
              <Col size="md-12">
                <div className="entry-form">
                  <div className="entry-form-container">
                    <EntryForm
                      onSubmit={addEntry}
                      entryToEdit={
                        editIndex !== null ? entries[editIndex] : null
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col size="md-12">
                <div className="entry-list-container">
                  <EntryList
                    entries={entries}
                    onDelete={deleteEntry}
                    onEdit={(index) => setEditIndex(index)}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
export default Journal;
