import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/EditClient.css";

function EditClient({ login }) {

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // useEffect(() => {
  //   fetch(`/clients/${login.id}`).then((res) => {
  //     if (res.ok) {
  //       return res.json().then((client) => setClient(client));
  //     }
  //   });
  // }, [login.id]);

  function handleSubmit(e) {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const formData = {
      client_id: login.id,
      email: login.email,
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
    });
  }

  function handleDeleteAccount() {
    fetch(`/clients/${login.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        alert("Account deleted successfully");
        window.location.reload();
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