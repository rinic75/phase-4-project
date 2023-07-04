import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import MyAppointment from './components/MyAppointment';
import EditAppointment from './components/EditAppointment';
import EditClient from './components/EditClient';
import Frontpage from './components/Frontpage';

function App() {
  
  const [login, onLogin] = useState(null);

  useEffect(() => {
    fetch('/me')
      .then(res => {
        if(res.ok) {
          return res.json().then(user => onLogin(user));
        }
      });
  }, []);

  

  return (
    <>
      <NavBar login={login} onLogin={onLogin} />
      <div className="App">
      <Routes>
        <Route path="/" element={<Frontpage onLogin={onLogin} />} />
        <Route path="/home" element={<Home login={login} />} />
        <Route path="/myappointments" element={<MyAppointment login={login} />} />
        <Route path="/appointments/:id" element={<EditAppointment />} />
        <Route path="/clients/:id" element={<EditClient login={login} />} />
      </Routes>
    </div>
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


