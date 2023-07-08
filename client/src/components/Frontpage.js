import React, {useContext} from "react";
import Signup from "./Signup";
import Login from "./Login";
import { UserContext } from "../UserContext";

function Frontpage() {
  const {login, onLogin} = useContext(UserContext)

  return (
    <div className="container">
    <h1>To get started and have the opportunity to meet our fantastic golf pros and make an appointment, we kindly invite you to create an account with us. If you've already created an account, simply login!</h1>
    <Signup onLogin={onLogin} />
    <Login onLogin={onLogin} />
  </div>
  );
}

export default Frontpage;