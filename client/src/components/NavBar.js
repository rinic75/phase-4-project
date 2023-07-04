import React, { useContext} from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";
import UserContext from "../UserContext";


function NavBar({ onLogin }) {
  const navigate = useNavigate();
  const login = useContext(UserContext);

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        onLogin(null);
      }
    });
    navigate("/");
  };

  return (
    <nav className="navbar">
      {login ? (
        <>
          <h2 className="navbar__welcome">Welcome {login.name}</h2>
          <ul className="navbar__links">
            <li>
              <NavLink to="/home" className="navbar__link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myappointments"
                className="navbar__link"
                // activeClassName="active"
              >
                My Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/clients/:id"
                className="navbar__link"
                // activeClassName="active"
              >
                Change Password
              </NavLink>
            </li>
          </ul>
          <button className="navbar__logout" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <div>
          <h2 className="navbar__welcome">Just Fore Fun Golf School</h2>
        </div>
      )}
    </nav>
  );
}

export default NavBar;