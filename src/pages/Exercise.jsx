import { useState, useEffect } from "react";
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import Hero from "../components/Hero/Hero";
import { Container, Row, Col } from "react-bootstrap";
import "../main.css"; 

function Exercise() {
  function UseLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  }

  const [entries, setEntries] = UseLocalStorage("workout-tracker-entries", []);

  const addEntry = (data) => {
    setEntries([...entries, data]);
  };

  const deleteEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  const updateEntry = (index, newData) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = newData;
    setEntries(updatedEntries);
  };

  const addRow = (data, index) => (
    <tr key={index}>
      <td>
        <input
          type="date"
          className="form-control"
          value={data.date}
          onChange={(e) => updateEntry(index, { ...data, date: e.target.value })}
        />
      </td>
      <td>
        <select
          className="form-control"
          value={data.workout}
          onChange={(e) => updateEntry(index, { ...data, workout: e.target.value })}
        >
          <option value="walking">Walking</option>
          <option value="running">Running</option>
          <option value="outdoor-cycling">Outdoor Cycling</option>
          <option value="indoor-cycling">Indoor Cycling</option>
          <option value="swimming">Swimming</option>
          <option value="yoga">Yoga</option>
        </select>
      </td>
      <td>
        <input
          className="form-control"
          type="number"
          value={data.duration}
          onChange={(e) => updateEntry(index, { ...data, duration: e.target.value })}
        />
        <span> minutes</span>
      </td>
      <td>
        <input
          className="form-control"
          type="number"
          value={data.distance}
          onChange={(e) => updateEntry(index, { ...data, distance: e.target.value })}
        />
        <span> miles</span>
      </td>
      <td>
        <button
          type="button"
          className="delete-button"
          onClick={() => deleteEntry(index)}
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="page-background exercise-page">
      <Hero>
        <h1 className="animate__animated animate__backInRight">
          Track Your Exercise!
        </h1>
      </Hero>
      <div className="container">
      <div className="content">
      <Container>
        <Row>
        <Col md={12}>
            <div className="entry-form">
              <h4 className="heading">Add New Workout</h4>
              <button
                className="add-entry-button"
                onClick={() => {
                  const date = new Date();
                  const year = date.getFullYear();
                  const month = (date.getMonth() + 1).toString().padStart(2, "0");
                  const day = date.getDate().toString().padStart(2, "0");
                  addEntry({
                    date: `${year}-${month}-${day}`,
                    workout: "walking",
                    duration: 30,
                    distance: 2,
                  });
                }}
              >
                Add Entry <FaPlusCircle />
              </button>
            </div>
          </Col>
          <Col md={12}>
            <div className="entry-list-container">
              <h4 className="heading">Workouts List</h4>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Workout</th>
                      <th>Duration</th>
                      <th>Distance</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, index) => addRow(entry, index))}
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

export default Exercise;