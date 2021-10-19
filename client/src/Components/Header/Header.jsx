import React, { Component, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//=========================Importing Links and Icons=================
import { Link, useHistory } from "react-router-dom";
import "../Header/Header.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "../SpecialComp/Button/Button.jsx";
import Badge from "@mui/material/Badge";

//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import { addAuthCust } from "../../Redux/actions/authentication.js";

//============================Main Function===================================//

function Header() {
  const [click, setClick] = useState(false);
  const [sButton, setButton] = useState(true);
  const [show, setShow] = useState(false);
  const [topheader, setHead] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const history = useHistory();
  const location = useLocation();

  //==================Redux =========================
  const dispatch = useDispatch();

  const { authCust } = useSelector((state) => state.auth);
  const { custData } = useSelector((state) => state.auth);
  const { itemsLength } = useSelector((state) => state.cart);

  {
    /*const handleLogin = () =>{
    history.push("/foodie-login")
  }

  const handleSignup = () =>{
    history.push("/foodie-signup")
  } */
  }

  const showButton = () => {
    if (window.innerWidth <= 480) {
      setButton(true);
    } else {
      setButton(true);
    }
  };
  /*useEffect(() => {
    // Update the document title using the browser API
    if (window.innerWidth <= 480) {
      setButton(false);
    } else {
      setButton(true);
    }
  });*/

  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    localStorage.removeItem("token");
    dispatch(addAuthCust(false));
    history.push("/");
    setShow(true);
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);
  return location.pathname === "/foodie-signup" ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/foodie-login" ? null : (
    <div className="Header">
      <div className="header-navbar">
        <Link className="logo-name-link" to="/" onClick={closeMobileMenu}>
          <h2>Eatsabyte </h2>
          {/*<i class="fas fa-hamburger"></i>*/}
        </Link>

        {/*} <div className="navbar-menuicon" >
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} onClick={handleClick}/>
    </div>*/}

        {
          //================== Mobile Version Hidden Navbar==========================

          sButton === true ? (
            <div className="navbar-menu">
              <ul
                className={
                  click ? "navbar-menu-items active" : "nav-menu-items inactive"
                }
              >
                {authCust === true ? (
                  <li className="navbar-menu-items">
                    (Welcome, {custData.firstName + " " + custData.lastName})
                  </li>
                ) : (
                  <li className="navbar-menu-items">
                    <Link
                      className="header-link"
                      to="/"
                      onClick={closeMobileMenu}
                    >
                      Home
                    </Link>
                  </li>
                )}

                <li className="navbar-menu-items">
                  <Link
                    className="header-link"
                    to="/restaurants"
                    onClick={closeMobileMenu}
                  >
                    Chefs
                  </Link>
                </li>

                {authCust === true ? (
                  <li className="navbar-menu-items">
                    <Link
                      className="header-link"
                      to="/user/orders-history"
                      onClick={closeMobileMenu}
                    >
                      Orders History
                    </Link>
                  </li>
                ) : (
                  <li className="navbar-menu-items">
                    <Link
                      className="header-link"
                      to="/mobile-app"
                      onClick={closeMobileMenu}
                    >
                      Mobile App
                    </Link>
                  </li>
                )}

                {authCust === true ? (
                  <li className="navbar-menu-items">
                    <Badge
                      badgeContent={itemsLength}
                      color="primary"
                      style={{ fontSize: "20px" }}
                    >
                      <Link className="header-link" to="/checkout">
                        <ShoppingCartIcon />
                      </Link>
                    </Badge>
                  </li>
                ) : null}

                {authCust === false ? (
                  <li className="navbar-menu-items">
                    {/*<Button
                title="SignUp"
                btn_link="/foodie-signup"
                height="35px"
                width="100px"
                
           />
           <Button
                title="Login"
                btn_link="/foodie-login"
                height="35px"
                width="100px"

              />
           */}

                    <Link className="signup-button-link" to="/foodie-signup">
                      <button className="signup-button">Signup</button>
                    </Link>

                    {/*<button onClick={handleSignup}>
                Signup
          </button>*/}
                  </li>
                ) : null}

                <li className="navbar-menu-items">
                  {authCust === false ? (
                    <Link className="login-button-link" to="/foodie-login">
                      <button className="login-button">Login</button>
                    </Link>
                  ) : (
                    <Link className="logout-button-link">
                      <button className="logout-button" onClick={handleLogout}>
                        Logout
                      </button>
                    </Link>
                  )}

                  {/*<button onClick={handleLogin}>
                Login
        </button>*/}
                </li>
              </ul>
            </div>
          ) : null
        }
      </div>
    </div>
  );
}

export default Header;
