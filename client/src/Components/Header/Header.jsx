import React, { Component, useEffect, useState } from "react";
//=========================Importing Links and Icons=================
import { Link } from "react-router-dom";
import "../Header/Header.css";

import Button from "../SpecialComp/Button/Button.jsx";

//============================Main Function===================================//

function Header() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <div className="Header">
      <div className="header-navbar">
        <Link className="logo-name-link" to="/" onClick={closeMobileMenu}>
          <h2>MagicMeal </h2>
          <i class="fas fa-hamburger"></i>
        </Link>

        {/*} <div className="navbar-menuicon" >
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} onClick={handleClick}/>
    </div>*/}

        <div className="navbar-menu">
          <ul
            className={
              click ? "navbar-menu-items active" : "nav-menu-items inactive"
            }
          >
            <li className="navbar-menu-items">
              <Link className="header-link" to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className="navbar-menu-items">
              <Link
                className="header-link"
                to="/restaurants"
                onClick={closeMobileMenu}
              >
                Restaurants
              </Link>
            </li>

            <li className="navbar-menu-items">
              <Link
                className="header-link"
                to="/mobile-app"
                onClick={closeMobileMenu}
              >
                Mobile App
              </Link>
            </li>

            <li className="navbar-menu-items">
              <Button
                title="SignUp"
                btn_link="/foodie-signup"
                height="35px"
                width="100px"
              />
            </li>

            <li className="navbar-menu-items">
              <Button
                title="Login"
                btn_link="/foodie-login"
                height="35px"
                width="100px"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
