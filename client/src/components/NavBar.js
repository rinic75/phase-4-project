import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";

function NavBar({ login, onLogin }) {
  const navigate = useNavigate();

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
              <NavLink to="/" className="navbar__link">
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