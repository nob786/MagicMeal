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

//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import { addAuthRest } from "../../Redux/actions/authentication.js";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  return (
    <div className="Restaurant-Header">
      <div className="restaurant-header-navbar">
        <Link className="restaurant-logo-name-link" to="/admin/menu-items">
          <h2>MagicMeal Restaurant Panel </h2>
        </Link>

        {/*} <div className="navbar-menuicon" >
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} onClick={handleClick}/>
    </div>*/}

        <div className="restaurant-navbar-menu">
          <ul
            className={
              click
                ? "restaurant-navbar-menu-items active"
                : "restaurant-nav-menu-items inactive"
            }
          >
            <li className="restaurant-navbar-menu-items">
              <Link className="restaurant-header-link" to="/admin/menu-items">
                Menu
              </Link>
            </li>

            <li className="restaurant-navbar-menu-items">
              <Link
                className="restaurant-header-link"
                to="/admin/orders-pending"
              >
                Orders Approval
              </Link>
            </li>

            <li className="restaurant-navbar-menu-items">
              <Link
                className="restaurant-header-link"
                to="/admin/orders-history"
              >
                Orders History
              </Link>
            </li>

            <li className="restaurant-navbar-menu-items">
              <Link
                className="restaurant-login-button-link"
                onClick={handleProfile}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {restData.restaurantName[0]}
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
                      width: 32,
                      height: 32,
                      ml: -0.5,
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
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
                  <ListItemIcon>{/*<Logout fontSize="small" />*/}</ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
