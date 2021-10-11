import React, { Component, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
//=========================Importing Links and Icons=================
import { Link, useHistory } from "react-router-dom";
import "./AdminHeader.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from "../../Components/SpecialComp/Button/Button.jsx";
import PersonIcon from '@material-ui/icons/Person';

//============================Main Function===================================//

function AdminHeader() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [show, setShow] =useState(true);
  const [topheader, setHead] =useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const history = useHistory();
  const location = useLocation();

  {/*const handleLogin = () =>{
    history.push("/foodie-login")
  }

  const handleSignup = () =>{
    history.push("/foodie-signup")
  } */}

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  


    
    
   

const handleLogout=()=>{
  localStorage.removeItem("token");
  setShow(true);
};
 
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);
  return (
  < div className="Admin-Header">
      <div className="header-navbar">
        <Link className="logo-name-link" to="/admin/dashboard" onClick={closeMobileMenu}>
          <h2>MagicMeal Restaurant Panel </h2>
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
              <Link className="header-link" to="/admin/menu-items" onClick={closeMobileMenu}>
                Menu
              </Link>
            </li>

            <li className="navbar-menu-items">
              <Link
                className="header-link"
                to="/admin/orders-pending"
                onClick={closeMobileMenu}
              >
                Orders Approval
              </Link>
            </li>

            <li className="navbar-menu-items">
              <Link
                className="header-link"
                to="/admin/orders-history"
                onClick={closeMobileMenu}
              >
                Orders History
              </Link>
            </li>

            

         
              {/*<button onClick={handleSignup}>
                Signup
          </button>*/}

        

           <li className="navbar-menu-items">
             <Button
              title="Logout"
              height="35px"
              width="100px"
              OnClick={handleLogout}
            /> 

              {/*<button onClick={handleLogin}>
                Login
        </button>*/}

            </li> 

            <li className="navbar-menu-items">
             
            </li>
            
          </ul>

          
                  <PersonIcon className="profile-link"/>
                  
        </div>
      </div>
    </div>
    
    
  );
}

export default AdminHeader;
