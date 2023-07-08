import React from "react";
import { useState } from "react";


function EditAppointmentModal({ appointment, onUpdate, onClose, golfpros }) {

  console.log(appointment);
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUpdatedAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  }


  function handleSubmit(event) {
    event.preventDefault();
    fetch(`/appointments/${appointment.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAppointment),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedAppointment) => {
          onUpdate(updatedAppointment);
          onClose();
        });
      }
    });
 }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Appointment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Time:
            <input
              type="text"
              name="time"
              value={updatedAppointment.time}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Lesson Info:
            <input
              type="text"
              name="lesson_info"
              value={updatedAppointment.lesson_info}
              onChange={handleInputChange}
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAppointmentModal;