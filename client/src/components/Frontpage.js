import React from "react";
import Signup from "./Signup";
import Login from "./Login";

function Frontpage({ onLogin }) {
  return (
    <div className="container">
    <h1>To get started and have the opportunity to meet our fantastic golf pros and make an appointment, we kindly invite you to create an account with us. If you've already created an account, simply login!</h1>
    <Signup onLogin={onLogin} />
    <Login onLogin={onLogin} />
  </div>
  );
}

export default Frontpage;