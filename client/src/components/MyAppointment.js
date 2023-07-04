import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyAppointment.css";

function MyAppointment({ login }) {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("/myappointments")
      .then((res) => {
        if (res.ok) {
          return res.json().then((appointment) => setAppointments(appointment));
        }
      });
  }, []);

  function handleDelete(appointmentId) {
    fetch(`/appointments/${appointmentId}`, 
    {
      method: "DELETE",
    })
    .then((r) => {
      if (r.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== appointmentId)
        );
      }
    })
  }

  return (
    <div className="my-appointments">
      <h1>My Appointments</h1>
      <ul style={{ listStyleType: "none" }}>
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointment-card">
            <h2>{appointment.client.name}</h2>
            <h2>{appointment.golfpro.name}</h2>
            <h3>{appointment.golfpro.email}</h3>
            <h3>{appointment.time}</h3>
            <h3>{appointment.lesson_info}</h3>
            <div className="button-group">
              <button className="edit-button" onClick={() => navigate(`/appointments/${appointment.id}`)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(appointment.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyAppointment;