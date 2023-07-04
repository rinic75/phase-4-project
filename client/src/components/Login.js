import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css'

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => onLogin(user));
          navigate("/home");
        } else {
          r.json().then((err) => {
            setErrors(err.errors);
            setEmail("");
            setPassword("");
            navigate("/");
          });
        }
      });
  }

  return (
    <div>
      <h2>Login</h2>
      {errors.length > 0 && (
        <div>
          <h2>Login</h2>
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;