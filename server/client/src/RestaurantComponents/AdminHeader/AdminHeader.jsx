import React, { Component, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
//=========================Importing Links and Icons=================
import { Link, useHistory } from "react-router-dom";
import "./AdminHeader.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "../../Components/SpecialComp/Button/Button.jsx";
import PersonIcon from "@material-ui/icons/Person";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";

//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import { addAuthRest } from "../../Redux/actions/authentication.js";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMobileHeader from "../../Components/MobileHeader/AdminMobileHeader";
toast.configure();

//============================Main Function===================================//

function AdminHeader() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [show, setShow] = useState(true);
  const [topheader, setHead] = useState(true);

  //==============================Profile===========================
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  //HAndle Click
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  //History and location Declare
  const history = useHistory();
  const location = useLocation();

  //==================Redux =========================
  const dispatch = useDispatch();

  const { authRest } = useSelector((state) => state.auth);
  const { restData } = useSelector((state) => state.auth);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleMyAccount = () => {
    history.push("/admin/profile");
  };

  //HandeClickMenuMangement
  const handleClickMenuManagement = () => {
    history.push("/admin/menu-items");
  };

  //HandeClickMenuMangement
  const handleClickAdminSettings = () => {
    history.push("/admin/settings");
  };
  const handleClickDashboard = () => {
    history.push("/admin/dashboard");
  };

  const handleLogout = () => {
    //localStorage.removeItem("magic-meal-restaurant-token");
    localStorage.removeItem("token");
    localStorage.removeItem("persist:root");

    dispatch(addAuthRest(false));
    //history.push("/");
    //window.location.reload(false);
    setTimeout(() => {
      window.location.replace("/");
    }, 1500);

    toast.success(`Successfully Logout`, {
      position: toast.POSITION.TOP_CENTER,
    });
    //history.replace("/");
    //<Redirect to="/" />;
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);
  // return !window.location.pathname.indexOf("/admin/") ? (
  return (
    <>
      <AdminMobileHeader />
      <div className="Header">
        <div className="header-navbar">
          <Link
            className="logo-name-link"
            to="/admin/dashboard"
            onClick={closeMobileMenu}
          >
            <h2>{window.name}-B</h2>
            {/*<i class="fas fa-hamburger"></i>*/}
          </Link>

          {/*} <div className="navbar-menuicon" >
      <i className={click ? 'fas fa-times' : 'fas fa-bars'} onClick={handleClick}/>
</div>*/}

          {
            //================== Mobile Version Hidden Navbar==========================

            <div className="navbar-menu">
              <ul
                className={
                  click ? "navbar-menu-items active" : "nav-menu-items inactive"
                }
              >
                <li className="navbar-menu-items">
                  <Link
                    style={{ textDecoration: "none" }}
                    className="login-button-link"
                    onClick={handleProfile}
                  >
                    <Avatar
                      sx={{
                        maxWidth: 32,
                        maxHeight: 32,
                        color: "white",
                        backgroundColor: "#fe724c",
                        textCombineUpright: "none",
                      }}
                    >
                      {restData.restaurantName
                        ? restData.restaurantName[0]
                        : null}
                    </Avatar>
                  </Link>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleProfileClose}
                    onClick={handleProfileClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 3,
                        "& .MuiAvatar-root": {
                          color: "white",
                          backgroundColor: "#fe724c",
                          width: 32,
                          height: 32,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{
                      horizontal: "right",
                      vertical: "top",
                    }}
                    anchorOrigin={{
                      horizontal: "right",
                      vertical: "bottom",
                    }}
                  >
                    {/*<MenuItem>
  <ListItemIcon>
      {<Settings fontSize="small" />}
    </ListItemIcon>
  {custData.firstName+" "+custData.lastName}
  </MenuItem>
  */}
                    <Divider />
                    <MenuItem onClick={handleMyAccount}>
                      <Avatar
                        sx={{
                          color: "#fe724c",
                          width: 32,
                          height: 32,
                          ml: 0,
                          mr: 1,
                        }}
                      />{" "}
                      Restaurant Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      sx={{ marginTop: 1 }}
                      onClick={handleClickDashboard}
                    >
                      <HomeIcon
                        sx={{
                          color: "#fe724c",
                          width: 32,
                          height: 32,
                          ml: 0,
                          mr: 1,
                        }}
                      />{" "}
                      Dashboard
                    </MenuItem>

                    <MenuItem
                      sx={{ marginTop: 1 }}
                      onClick={handleClickMenuManagement}
                    >
                      <RestaurantMenuIcon
                        sx={{
                          color: "#fe724c",
                          width: 32,
                          height: 32,
                          ml: 0,
                          mr: 1,
                        }}
                      />{" "}
                      Menu Management
                    </MenuItem>

                    <MenuItem
                      sx={{ marginTop: 1 }}
                      onClick={handleClickAdminSettings}
                    >
                      <SettingsIcon
                        sx={{
                          color: "#fe724c",
                          width: 32,
                          height: 32,
                          ml: 0,
                          mr: 1,
                        }}
                      />{" "}
                      Settings
                    </MenuItem>
                    <Divider />

                    <MenuItem onClick={handleLogout}>
                      {/* <ListItemIcon>
                      <Logout fontSize="small" />
                      
                    </ListItemIcon> */}
                      <LogoutIcon
                        sx={{
                          color: "#fe724c",
                          width: 32,
                          height: 32,
                          ml: 0,
                          mr: 1,
                        }}
                      />
                      Logout
                    </MenuItem>
                  </Menu>
                </li>
                {/* <li className="navbar-menu-items">
                <Link className="header-link" to="/admin/dashboard">
                  Dashboard
                </Link>
              </li> */}

                {/* <li className="navbar-menu-items">
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Dine-In Orders
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a class="dropdown-item" href="#">
                        Active Orders
                      </a>
                      <a class="dropdown-item" href="#">
                        Past Orders
                      </a>
                    </div>
                  </div>
                </li> */}

                <li className="navbar-menu-items">
                  <Link
                    className="header-link"
                    to="/admin/dinein-orders"
                    onClick={closeMobileMenu}
                  >
                    Dine-in Orders
                  </Link>
                </li>
                <li className="navbar-menu-items">
                  <Link
                    className="header-link"
                    to="/admin/orders"
                    onClick={closeMobileMenu}
                  >
                    Pick-Up Orders
                  </Link>
                </li>
                <li className="navbar-menu-items">
                  <Link
                    className="header-link"
                    to="/admin/table-reservations"
                    onClick={closeMobileMenu}
                  >
                    Table Reservations
                  </Link>
                </li>
                {/* <li className="navbar-menu-items">
                  <Link
                    className="header-link"
                    to="/restaurants"
                    onClick={closeMobileMenu}
                  >
                    Dine-in Orders
                  </Link>
                </li> */}
                {/* <li className="navbar-menu-items">
                <Link
                  className="header-link"
                  to="/dine-in/qrscanner"
                  // onClick={closeMobileMenu}
                >
                  Dine-In
                </Link>
              </li> */}
                {/* <li className="navbar-menu-items">
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Table Reservations
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a class="dropdown-item" href="#">
                        Pending Reservations
                      </a>
                      <a class="dropdown-item" href="#">
                        Reservations
                      </a>
                    </div>
                  </div>
                </li>
                <li className="navbar-menu-items">
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      PickUp Orders
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link class="dropdown-item" to="/admin/orders-pending">
                        Pending Approvals
                      </Link>
                      <Link class="dropdown-item" to="/">
                        Accepted Orders
                      </Link>
                      <Link class="dropdown-item" to="/">
                        Ready Orders
                      </Link>
                      <Link class="dropdown-item" to="/admin/orders-history">
                        Past Orders
                      </Link>
                    </div>
                  </div>
                </li> */}

                {/* <li className="navbar-menu-items">
                <Link className="header-link" to="/user/orders-history">
                  Orders
                </Link>
              </li> */}

                {/* <li className="navbar-menu-items">
                <Link className="signup-button-link" to="/foodie-signup">
                  <button className="signup-button">Signup</button>
                </Link>
              </li>

              <li className="navbar-menu-items">
                <Link className="login-button-link" to="/foodie-login">
                  <button className="login-button">Login</button>
                </Link>
              </li> */}
              </ul>
            </div>
          }
        </div>
      </div>
    </>
  );

  // ) : null;
}

export default AdminHeader;
