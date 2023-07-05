import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewGolfpro() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name: name,
      email: email,
      bio: bio,
    };

    fetch("/golfpros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        return r.json().then((golfpro) => {
          
          navigate("/home");
        });
      }
    });
  }

  return (
    <div className="new-golfpro-container">
      <h1>New Golf Pro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="bio">Bio: </label>
        <input
          type="text"
          id="bio"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewGolfpro;