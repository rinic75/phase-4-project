import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/EditAppointment.css";

function EditAppointment({ golfpros, editedAppointment }) {
  const [appointment, setAppointment] = useState({
    golfpro_id: "",
    client_id: "",
    time: "",
    lesson_info: "",
  });
  const [selectedGolfPro, setSelectedGolfPro] = useState("");
  const { id } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    fetch(`/appointments/${id}`).then((res) => {
      if (res.ok) {
        return res.json().then((appointment) => setAppointment(appointment));
      }
    });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    const { time, lesson_info } = e.target;
    const formData = {
      golfpro_id: selectedGolfPro,
      client_id: appointment.client_id,
      time: time.value,
      lesson_info: lesson_info.value,
    };
    fetch(`/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        return r.json().then((appointment) => {
          editedAppointment(appointment);
          // navigate("/myappointments");
        });
      }
      else {
        r.json().then((err) => {
          console.log(err);
        }
      );
      }
    });
  }

  function handleSelectGolfPro(e) {
    setSelectedGolfPro(e.target.value);
  }

  function handleTimeChange(e) {
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      time: e.target.value,
    }));
  }

  function handleLessonInfoChange(e) {
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      lesson_info: e.target.value,
    }));
  }

  return (
    <div className="edit-appointment">
      <h1>Edit Appointment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="time">Time:</label>
        <input
          type="text"
          id="time"
          name="time"
          value={appointment.time}
          onChange={handleTimeChange}
        />
        <label htmlFor="lesson_info">Lesson Info:</label>
        <input
          type="text"
          id="lesson_info"
          name="lesson_info"
          value={appointment.lesson_info}
          onChange={handleLessonInfoChange}
        />
        <label htmlFor="golfpro">Golf Pro:</label>
        <select
          id="golfpro"
          name="golfpro"
          value={selectedGolfPro}
          onChange={handleSelectGolfPro}
        >
          {golfpros &&
            golfpros.map((golfpro) => (
              <option key={golfpro.id} value={golfpro.id}>
                {golfpro.name}
              </option>
            ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditAppointment;