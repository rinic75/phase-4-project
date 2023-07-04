import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";

function Signup({ onLogin }) {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => onLogin(user));
          navigate("/home");
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
  }
 
  if (typeof errors !== 'undefined' && errors.length > 0) {
    return (
      <div className="error-container">
        <h2 className="signup-heading">Signup</h2>
        {errors.map((err) => (
          <p key={err} className="error-message">
            {err}
          </p>
        ))}
      {/* <button className="error-button" onClick={() => navigate("/")}>Back</button> */}
      <button className="error-button" onClick={() => window.location.href = "/"}>Back</button>
      </div>
    );
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h1 className="signup-heading">Signup</h1>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form-input"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="form-input"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-input"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="signup-button">
        Signup
      </button>
    </form>
  );
}

export default Signup;