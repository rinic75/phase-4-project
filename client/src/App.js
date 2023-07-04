import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Signup from './components/Signup'
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';
import MyAppointment from './components/MyAppointment';
import EditAppointment from './components/EditAppointment';
import EditClient from './components/EditClient';

function App() {
  
  const [login, onLogin] = useState(null);
  const [golfpros, setGolfpros] = useState([]);

  useEffect(() => {
    fetch('/me')
      .then(res => {
        if(res.ok) {
          return res.json().then(user => onLogin(user));
        }
      });
  }, []);

  useEffect(() => {
    fetch("/golfpros").then((res) => {
      if (res.ok) {
        return res.json().then((golfpros) => setGolfpros(golfpros));
      }
    });
  }, []);

  return (
    <>
      <NavBar login={login} onLogin={onLogin} />
      {!login ? (
        <div className="container">
          <h1>To get started and have the opportunity to meet our fantastic golf pros and make an appointment, we kindly invite you to create an account with us. If you've already created an account, simply login!</h1>
          <Signup onLogin={onLogin} />
          <Login onLogin={onLogin} />
        </div>
      ) : (
        <div className="App">
          <Routes>
            <Route path="/" element={<Home login={login} golfpros={golfpros} />} />
            <Route path="/myappointments" element={<MyAppointment login={login} />} />
            <Route path="/appointments/:id" element={<EditAppointment golfpros={golfpros} />} />
            <Route path="/clients/:id" element={<EditClient login={login} />} />
          </Routes>
        </div>
      )}
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


