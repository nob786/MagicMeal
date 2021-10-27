import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


//=========================Importing Links and Icons=================
import { Link, useHistory } from "react-router-dom";

//==========================Redux imports===================================
import { useDispatch,useSelector } from "react-redux";
import {addAuthCust} from "../../Redux/actions/authentication.js"



export default function MobileHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [state, setState] = React.useState({
    left: false,
  });


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  //================================Redux Authentication====================================
  const history = useHistory();
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

  const handleLogout=()=>{
    localStorage.removeItem("persist:root");
    localStorage.removeItem("token");
    dispatch(addAuthCust(false));
    history.push("/");
  };


  //===============================================Material Ui Drawer===========================================

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
    
      sx={{ width: 200}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{backgroundColor: "#242424"}}>
        
        <Link to="/" style={{color: "black", textDecoration: "none"}}>
          <ListItem button >
            <ListItemText primary={"Home"}  style={{color: "white"}} />
          </ListItem>
          </Link>


          <Link to="/restaurants" style={{color: "black", textDecoration: "none"}}>
          <ListItem button >
            <ListItemText primary={"Chefs"} style={{color: "white"}} />
          </ListItem>
          </Link>


          {
          (authCust===true) ? <Link to="/user/orders-history" style={{color: "black", textDecoration: "none"}}>
          <ListItem button >
            <ListItemText primary={"Orders History"} style={{color: "white"}} />
          </ListItem>
          </Link>
          : 
          null
          }


          {
          (authCust===true) ? <Link to="/mobile-app" style={{color: "black", textDecoration: "none"}}>
          <ListItem button >
            <ListItemText primary={"Mobile App"} style={{color: "white"}} />
          </ListItem>
          </Link>
          :
          null
}

         { (authCust=== true) ? <Link to="/checkout" style={{color: "black", textDecoration: "none"}}>
          <ListItem button >
            <ListItemText primary={"Cart"} style={{color: "white"}} />
          </ListItem>
          </Link>
          :
          null
}

     </List>

      <Divider />

      <List style={{backgroundColor: "#242424"}}>

        
        {
            (authCust===false) ? <Link to="/foodie-login" style={{color: "black", textDecoration: "none"}}>
         <ListItem button >
            <ListItemText primary={"Login"} style={{color: "white"}} />
          </ListItem>
          </Link>
          : 
          null
          }

          {
              (authCust===false) ? <Link to="/foodie-signup" style={{color: "black", textDecoration: "none"}}>
          <ListItem button >
            <ListItemText primary={"Signup"} style={{color: "white"}} />
          </ListItem>
          </Link>:
          null
          }

          {(authCust===true) ? <Link onClick={handleLogout} style={{color: "black", textDecoration: "none"}}>
          <ListItem button >
            <ListItemText primary={"Logout"} style={{color: "white"}} />
          </ListItem>
          </Link>
          :
          null}
       
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style={{backgroundColor: "#242424"}}>
        <Toolbar>

        {['left'].map((anchor) => (
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
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}

          
          
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{textDecoration: "none"}} to="/">Eatsabyte</Link> 
          </Typography>
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
    </Box>
  );
}
