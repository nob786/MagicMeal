import React, { Component, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
//=========================Importing Links and Icons=================
import { Link, useHistory } from "react-router-dom";
import "../Header/Header.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from "../SpecialComp/Button/Button.jsx";
import Badge from '@mui/material/Badge';

//==========================Redux imports===================================
import { useDispatch,useSelector } from "react-redux";
import {addAuthCust} from "../../Redux/actions/authentication.js"


//==============================material ui profile imports===============
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
//import PersonAdd from '@mui/icons-material/PersonAdd';
//import Settings from '@mui/icons-material/Settings';
//import Logout from '@mui/icons-material/Logout';










//============================Main Function===================================//

function Header() {


  //==============================Profile===========================
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };




  const [click, setClick] = useState(false);
  const [sButton, setButton] = useState(true);
  const [show, setShow] =useState(false);
  const [topheader, setHead] =useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const history = useHistory();
  const location = useLocation();


//==================Redux =========================
const dispatch=useDispatch();



  const {authCust} = useSelector(
    (state) => state.auth
  );
  const {custData} = useSelector(
    (state) => state.auth
  );
  const {itemsLength} = useSelector(
    (state) => state.cart
  );


  


  {/*const handleLogin = () =>{
    history.push("/foodie-login")
  }

  const handleSignup = () =>{
    history.push("/foodie-signup")
  } */}

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


    
    
   

const handleLogout=()=>{
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
  return (
     
    location.pathname === "/foodie-signup"|| location.pathname ==="/admin/dashboard" || location.pathname ==="/foodie-login" ? 
    null:
      < div className="Header">
      <div className="header-navbar">
        <Link className="logo-name-link" to="/" onClick={closeMobileMenu}>
          <h2>Eatsabyte </h2>
          {/*<i class="fas fa-hamburger"></i>*/}
        </Link>

        {/*} <div className="navbar-menuicon" >
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} onClick={handleClick}/>
    </div>*/}


    {//================== Mobile Version Hidden Navbar==========================

    sButton===true
    ?
        <div className="navbar-menu">
          <ul
            className={
              click ? "navbar-menu-items active" : "nav-menu-items inactive"
            }
          >
            { (authCust===true ) ? 
            
            <li className="navbar-menu-items">
                 <Link className="login-button-link" onClick={handleProfile}>
                        <Avatar sx={{ width: 32, height: 32 }}>{custData.firstName[0]}</Avatar>
                </Link>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleProfileClose}
        onClick={handleProfileClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 3,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
        <ListItemIcon>
            {/*<Settings fontSize="small" />*/}
          </ListItemIcon>
        {custData.firstName+" "+custData.lastName}
        </MenuItem>
        <Divider />
        <MenuItem>
          <Avatar /> My Account 
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            {/*<Settings fontSize="small" />*/}
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon >
            {/*<Logout fontSize="small" />*/}
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
            </li>
            
            :  <li className="navbar-menu-items">
              <Link className="header-link" to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
}

            

            { (window.innerWidth >480) ?
            <li className="navbar-menu-items">
              <Link
                className="header-link"
                to="/restaurants"
                onClick={closeMobileMenu}
              >
                Chefs
              </Link>
            </li>
            : null
}

           { (authCust===true && window.innerWidth >480) ? 
           
           <li className="navbar-menu-items">
              <Link
                className="header-link"
                to="/user/orders-history"
              >
                Orders History
              </Link>
            </li>
            :
            <li className="navbar-menu-items">
              <Link
                className="header-link"
                to="/mobile-app"
              >
                Mobile App
              </Link>
            </li>
}
            

            {authCust===true ? 
                <li className="navbar-menu-items">
                   <Badge badgeContent={itemsLength} color="primary" style={{fontSize: "20px"}}>
                       <Link className="header-link"
                          to="/checkout">
                          <ShoppingCartIcon/>
                        </Link> 

                    </Badge>
              </li>
    

                   
            :
            null
}

           {authCust===false ? <li className="navbar-menu-items">
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
              <button className="signup-button">
                Signup
              </button>
              </Link>


              {/*<button onClick={handleSignup}>
                Signup
          </button>*/}

            </li> : null }

           <li className="navbar-menu-items">
           {authCust===false ? 

            <Link className="login-button-link" to="/foodie-login">
              <button className="login-button">
                Login
              </button>
           </Link>

              : 
                
              null
                  
                
                
                 }

              {/*<button onClick={handleLogin}>
                Login
        </button>*/}

            </li> 
            
          </ul>
        </div>
        : null
      }
      </div>
    </div>
    
    
  );
}

export default Header;
