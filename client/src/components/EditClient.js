import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/EditClient.css";
import {UserContext} from "../UserContext";

function EditClient() {

  const login = useContext(UserContext);

  console.log(login);

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const formData = {
      password: newPassword,
    };

    fetch(`/clients/${login.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        return r.json().then(() => {
          setPasswordError("");
          navigate(`/myappointments`);

        });
      }
      else {
        r.json().then((err) => setPasswordError(err.error));
      }
    });
  }

  function handleDeleteAccount() {
    fetch(`/clients/${login.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        alert("Account deleted successfully");
        navigate(`/`);
      }
    });
  }

  return (
    <div className="edit-client-container">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new_password">Enter New Password:</label>
        <input
          type="password"
          id="new_password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label htmlFor="confirm_new_password">Confirm New Password:</label>
        <input
          type="password"
          id="confirm_new_password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <button type="submit">Submit</button>
      </form>
      
      <div className="delete-account-section">
        <h2>Delete Account</h2>
        <p>Deleting your account is irreversible. Are you sure you want to proceed?</p>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}

export default EditClient;