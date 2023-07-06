import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Home.css'
import UserContext from "../UserContext";

function Home({ golfprosInfo }) {
  const login = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedGolfProId, setSelectedGolfProId] = useState(null);
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState([]);
  const [golfpros, setGolfpros] = useState([]);

  useEffect(() => {
    fetch("/golfpros").then((res) => {
      if (res.ok) {
        return res.json().then((golfpros) => {
          setGolfpros(golfpros)
          golfprosInfo(golfpros)
        }
      );
      }
    });
  }, []);


  function handleClick(golfproId) {
    setSelectedGolfProId(golfproId);
  }

  function closeModal() {
    setSelectedGolfProId(null);
  }

  function handleDelete (id) {
    fetch(`/golfpros/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setGolfpros((prevGolfpros) =>
          prevGolfpros.filter((golfpro) => golfpro.id !== id)
          );
      }
    });
  }
  

  function handleSubmit(e) {
    e.preventDefault();
    const appointmentData = {
      golfpro_id: selectedGolfProId,
      client_id: login.id,
      time: time,
      lesson_info: notes,
    };


    fetch("/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((appointment) => {
          setGolfpros((prevGolfpros) =>
            prevGolfpros.map((golfpro) =>
              golfpro.id === selectedGolfProId
                ? { ...golfpro, appointments: [...golfpro.appointments, appointment] }
                : golfpro
            )
          );
          closeModal();
        });

      } else {
        r.json().then((err) => {
          console.log(err);
          setErrors(err.errors);
        });
      }
    });
  }

  return (
    <div className="home-container">
      <h2>Just Fore Fun Golf School</h2>
      <h3>Meet Our Golf Pros</h3>
      <ul className="golfpros-list">
        {golfpros.map((golfpro) => (
          <li key={golfpro.id} className="golfpro-item">
            <div className="golfpro-box">
              <h4>{golfpro.name}</h4>
              <p>Bio: {golfpro.bio}</p>
              <p>Contact: {golfpro.email}</p>
              <div className="button-group">
                <button onClick={() => handleClick(golfpro.id)}>
                  Make an Appointment
                </button>
                <button onClick={() => handleDelete(golfpro.id)}>
                  Delete
                </button>
              </div>
            </div>
            {selectedGolfProId === golfpro.id && (
              <div className="modal-container">
                <div className="modal-content">
                  <h2>Make an Appointment</h2>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="time">Time (YYYY-MM-DD HH:MM)</label>
                      <input
                        type="text"
                        id="time"
                        autoComplete="off"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="YYYY-MM-DD HH:MM"
                      />
                    </div>

                    <div>
                      <label htmlFor="notes">Notes</label>
                      <input
                        type="text"
                        id="notes"
                        autoComplete="off"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        style={{ width: "100%" }}
                        placeholder="Enter any notes about the appointment"
                      />
                    </div>
                    <button type="submit">Confirm</button>
                  </form>

                  {errors.length > 0 && (
                    <div>
                      <h4>Errors:</h4>
                      <ul>
                        {errors.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="footer">
        <button onClick={()=>navigate('/newgolfpro')}>Add a Golf Pro</button>
      </div>
    </div>
  );
}

export default Home;
