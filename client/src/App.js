import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import MyAppointment from "./components/MyAppointment";
import EditAppointment from "./components/EditAppointment";
import EditClient from "./components/EditClient";
import NewGolfpro from "./components/NewGolfpro";
import Frontpage from "./components/Frontpage";
import UserContext from "./UserContext";

function App() {
  const [login, onLogin] = useState(null);
  const [golfpros, setGolfpros] = useState([]);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        return res.json().then((user) => onLogin(user));
      }
    });
  }, []);


  function editedAppointment(appointment) {
    const updatedAppointments = login.appointments.map((a) => {
      if (a.id === appointment.id) {
        return appointment;
      } else {
        return a;
      }
    });
    onLogin({ ...login, appointments: updatedAppointments });
  }

  function golfprosInfo(golfprosInfo) {
    setGolfpros(golfprosInfo)
  }

  return (
    <>
      <UserContext.Provider value={login}>
        <NavBar onLogin={onLogin} />
        <div className="App">
          <Routes>
            <Route path="/" element={<Frontpage onLogin={onLogin} />} />
            <Route path="/home" element={<Home golfprosInfo={golfprosInfo}/>} />
            <Route
              path="/myappointments"
              element={<MyAppointment />}
            />
            <Route 
              path="/appointments/:id" 
              element={<EditAppointment editedAppointment={editedAppointment} golfpros={golfpros}/>} />
            <Route path="/clients/:id" element={<EditClient />} />
            <Route path="/newgolfpro" element={<NewGolfpro />} />
          </Routes>
        </div>
      </UserContext.Provider>
      
      <style>{`
      .container {
        max-width: 600px;
        margin: 0 auto;
        text-align: center;
      }
      h1 {
        font-size: 24px;
        margin-bottom: 20px;
      }
      .App {
        padding: 20px;
      }
      .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
      }
      input {
        font-size: 18px;
        padding: 5px;
        margin-top: 5px;
      }
    `}</style>
    </>
  );
}

export default App;
