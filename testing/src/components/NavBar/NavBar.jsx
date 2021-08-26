import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../redux/actions/authActions";
import axios from "axios";
const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Here i am calling a logout function directly. In future i will implement Redux Logout Function
  const logOut = () => {
    console.log("Clicked");
    //dispatch(logout);

    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    history.push("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="#">
          Navbar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className=" nav-link " to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className=" nav-link" to="/contact">
                Contact
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className=" nav-link" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className=" nav-link" to="/login">
                Log In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className=" nav-link " to="/signup">
                Sign Up
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="btn " type="button" onClick={logOut}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
