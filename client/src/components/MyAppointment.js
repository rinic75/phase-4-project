import React from "react";
import { useState, useContext } from "react";
import EditAppointmentModal from "./EditAppointmentModal";
import { UserContext } from "../UserContext";

function MyAppointment({ golfpros }) {
  const {login, onLogin} = useContext(UserContext)
  const [appointments, setAppointments] = useState(login.appointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(appointments)
  // useEffect(() => {
  //   fetch("/myappointments")
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json().then((appointments) => {
  //           setAppointments(appointments);
  //           setIsLoading(false);
  //         });
  //       }
  //     });
  // }, []);

  function handleDelete(appointmentId) {
    fetch(`/appointments/${appointmentId}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment.id !== appointmentId)
          );
          onLogin({...login, appointments: login.appointments.filter((appointment) => appointment.id !== appointmentId)})
        }
      });
  }

  function handleEdit(appointmentId) {
    const appointment = appointments.find((appointment) => appointment.id === appointmentId);
    setSelectedAppointment(appointment);
    setShowModal(true);
  }

  function handleUpdate(updatedAppointment) {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === updatedAppointment.id) {
        return updatedAppointment;
      } else {
        return appointment;
      }
    });
    setAppointments(updatedAppointments);
    const updatedLogin = { ...login, appointments: updatedAppointments };
  onLogin(updatedLogin);
  }

  return (
    <div className="my-appointments">
      <h1>My Appointments</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : login.appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul style={{ listStyleType: "none" }}>
          {login.appointments.map((appointment) => (
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