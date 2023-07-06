import React from "react";
import { useState, useEffect } from "react";
import EditAppointmentModal from "./EditAppointmentModal";

function MyAppointment({ golfpros }) {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/myappointments")
      .then((res) => {
        if (res.ok) {
          return res.json().then((appointments) => {
            setAppointments(appointments);
            setIsLoading(false);
          });
        }
      });
  }, []);

  function handleDelete(appointmentId) {
    fetch(`/appointments/${appointmentId}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment.id !== appointmentId)
          );
        }
      });
  }

  function handleEdit(appointmentId) {
    const appointment = appointments.find((appointment) => appointment.id === appointmentId);
    setSelectedAppointment(appointment);
    setShowModal(true);
  }

  function handleUpdate(updatedAppointment) {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === updatedAppointment.id ? updatedAppointment : appointment
      )
    );
    setShowModal(false);
  }

  return (
    <div className="my-appointments">
      <h1>My Appointments</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul style={{ listStyleType: "none" }}>
          {appointments.map((appointment) => (
            <li key={appointment.id} className="appointment-card">
              <h2>{appointment.golfpro ? appointment.golfpro.name : ""}</h2>
              <h3>{appointment.golfpro ? appointment.golfpro.email : ""}</h3>
              <h3>{appointment.time}</h3>
              <h3>{appointment.lesson_info}</h3>
              <div className="button-group">
                <button className="edit-button" onClick={() => handleEdit(appointment.id)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(appointment.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <EditAppointmentModal
          golfpros={golfpros}
          appointment={selectedAppointment}
          onUpdate={handleUpdate}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default MyAppointment;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../css/MyAppointment.css";


// function MyAppointment() {

//   // const navigate = useNavigate();
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     fetch("/myappointments")
//       .then((res) => {
//         if (res.ok) {
//           return res.json().then((appointment) => setAppointments(appointment));
//         }
//       });
//   }, []);
  

//   function handleDelete(appointmentId) {
//     fetch(`/appointments/${appointmentId}`, 
//     {
//       method: "DELETE",
//     })
//     .then((r) => {
//       if (r.ok) {
//         setAppointments((prevAppointments) =>
//           prevAppointments.filter((appointment) => appointment.id !== appointmentId)
//         );
//       }
//     })
//   }
  

//   return (
//     <div className="my-appointments">
//       <h1>My Appointments</h1>
//       <ul style={{ listStyleType: "none" }}>
//         {appointments.map((appointment) => (
//           <li key={appointment.id} className="appointment-card">
//             <h2>{appointment.golfpro.name}</h2>
//             <h3>{appointment.golfpro.email}</h3>
//             <h3>{appointment.time}</h3>
//             <h3>{appointment.lesson_info}</h3>
//             <div className="button-group">
//               <button className="edit-button" onClick={() => handleEdit(appointment.id)}>Edit</button>
//               <button className="delete-button" onClick={() => handleDelete(appointment.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default MyAppointment;