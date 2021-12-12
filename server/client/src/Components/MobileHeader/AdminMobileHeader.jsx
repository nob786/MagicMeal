import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import "./MobileHeader.css";

//=========================Material Ui Imports=================
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import DiningIcon from "@mui/icons-material/Dining";
//=========================Importing Links and Icons=================
import { Link, useHistory } from "react-router-dom";

//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import { addAuthRest } from "../../Redux/actions/authentication.js";
//=================React  Notification==================
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileHeader from "../MobileHeader/MobileHeader";
toast.configure();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminMobileHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [state, setState] = React.useState({
    left: false,
  });

  const [openLogoutSuccess, setLogoutSuccess] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //================================Redux Authentication====================================
  const history = useHistory();
  const dispatch = useDispatch();

  const { authRest } = useSelector((state) => state.auth);
  const { restData } = useSelector((state) => state.auth);
  const { itemsLength } = useSelector((state) => state.cart);

  const handleLogout = () => {
    //localStorage.removeItem("magic-meal-customer-token");
    // localStorage.removeItem("token");
    // localStorage.removeItem("persist:root");

    // dispatch(addAuthRest(false));
    // setTimeout(() => {
    //   history.push("/");
    // }, 2000);
    // setLogoutSuccess(true);
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

  //Snackbar States

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setLogoutSuccess(false);
  };

  //===============================================Material Ui Drawer===========================================

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{}}>
        <Link
          to="/admin/profile"
          style={{ color: "black", textDecoration: "none" }}
        >
          <ListItem button>
            <AccountCircleIcon style={{ color: "#fe724c" }} />
            <ListItemText
              primary={"Restaurant Profile"}
              style={{ color: "#272d2f", marginLeft: "5%" }}
            />
          </ListItem>
        </Link>
        <Divider style={{ backgroundColor: "black" }} />
      </List>

      <List style={{}}>
        <Link
          to="/admin/dashboard"
          style={{ color: "black", textDecoration: "none" }}
        >
          <ListItem button>
            <HomeIcon style={{ color: "#fe724c" }} />
            <ListItemText
              primary={"Dashboard"}
              style={{ color: "#272d2f", marginLeft: "5%" }}
            />
          </ListItem>
        </Link>
        <Link
          to="/admin/menu-items"
          style={{ color: "black", textDecoration: "none" }}
        >
          <ListItem button>
            <RestaurantIcon style={{ color: "#fe724c", marginTop: "5%" }} />
            <ListItemText
              primary={"Menu Management"}
              style={{ color: "black", marginTop: "5%", marginLeft: "5%" }}
            />
          </ListItem>
        </Link>
        <Link
          to="/admin/orders"
          style={{ color: "black", textDecoration: "none" }}
        >
          <ListItem button>
            <HistoryIcon style={{ color: "#fe724c", marginTop: "5%" }} />
            <ListItemText
              primary={"Pick-up Orders"}
              style={{ color: "black", marginTop: "5%", marginLeft: "5%" }}
            />
          </ListItem>
        </Link>
        <Link
          to="/admin/dinein-orders"
          style={{ color: "black", textDecoration: "none" }}
        >
          <ListItem button>
            <DiningIcon style={{ color: "#fe724c", marginTop: "5%" }} />
            <ListItemText
              primary={"Dine-in Orders"}
              style={{ color: "black", marginTop: "5%", marginLeft: "5%" }}
            />
          </ListItem>
        </Link>
        <Link
          to="/admin/table-reservations"
          style={{ color: "black", textDecoration: "none" }}
        >
          <ListItem button>
            <TableRestaurantIcon
              style={{ color: "#fe724c", marginTop: "5%" }}
            />
            <ListItemText
              primary={"Table Reservations"}
              style={{ color: "black", marginTop: "5%", marginLeft: "5%" }}
            />
          </ListItem>
        </Link>
      </List>

      <Divider style={{ backgroundColor: "black" }} />

      <List style={{}}>
        {/* <Link
          to="/foodie-login"
          style={{ color: "black", textDecoration: "none" }}
        >
          <ListItem button>
            <LoginIcon style={{ color: "#fe724c", marginTop: "5%" }} />
            <ListItemText
              primary={"Login"}
              style={{ color: "black", marginTop: "5%", marginLeft: "5%" }}
            />
          </ListItem>
        </Link> */}
        <Link
          to="/admin/settings"
          style={{ color: "black", textDecoration: "none" }}
        >
          <ListItem button>
            <SettingsIcon style={{ color: "#fe724c", marginTop: "5%" }} />
            <ListItemText
              primary={"Settings"}
              style={{ color: "black", marginTop: "5%", marginLeft: "5%" }}
            />
          </ListItem>
        </Link>
        <Link
          onClick={handleLogout}
          style={{ color: "black", textDecoration: "none" }}
        >
          <ListItem button>
            <LogoutIcon style={{ color: "#fe724c", marginTop: "5%" }} />
            <ListItemText
              primary={"Logout"}
              style={{
                color: "black",
                marginTop: "5%",
                marginLeft: "5%",
                marginLeft: "5%",
              }}
            />
          </ListItem>
        </Link>
      </List>

      <Divider />

      <List style={{}}>
        {/* authCust === true ? (
          <Link
            to="/user/settings"
            style={{ color: "black", textDecoration: "none" }}
          >
            <ListItem button>
              <SettingsIcon style={{ color: "#fe724c", marginTop: "5%" }} />
              <ListItemText
                primary={"Settings"}
                style={{
                  color: "black",
                  marginTop: "5%",
                  marginLeft: "5%",
                  marginLeft: "5%",
                }}
              />
            </ListItem>
          </Link>
        ) : null */}
      </List>
    </Box>
  );

  return (
    <Box className="Mobile-Header" sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style={{ backgroundColor: "#fe724c" }}>
        <Toolbar>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <IconButton
                onClick={toggleDrawer(anchor, true)}
                size="66px"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "28px",
                  color: "white",
                }}
                to="/admin/dashboard"
              >
                MagicMeal-B
              </Link>

              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}

          {/*(
            <div>
              <IconButton
                size= "90"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>



           

            </div>
            
          )*/}
        </Toolbar>
      </AppBar>

      {/*/Snack Bar */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openLogoutSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully logged-out.
        </Alert>
      </Snackbar>
    </Box>
  );
}
