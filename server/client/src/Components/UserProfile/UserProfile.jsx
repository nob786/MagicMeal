import React, { Component } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "../../axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";


// Redux Imports
import { useSelector } from "react-redux";



//Import Css File
import "./UserProfile.css"



const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));



const UserProfile= () =>{

    const [editChanges, setEditChanges] = React.useState(false);
    const [rOnly, setROnly] = React.useState(true);

    
    const classes = useStyles();
     const history =useHistory();



     //Customer Data
     const {custData} = useSelector(
        (state) => state.auth
      );

   const handleUserProfileEdit=()=>{
       setEditChanges(true);
       setROnly(false);
  }

  
  const handleUserCancel=()=>{

    setEditChanges(false);
    setROnly(true);
}


      

return(
    
    <div className="user-profile">


        <div className="user-profile-header">
                <h1>Welcome! {custData.firstName+" "+custData.lastName}</h1>
                
        </div>

        
       
        

        <Container component="main" maxWidth="xs" className="user-profile-container">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                name="userFirstName"
                variant="outlined"
                fullWidth
                label="First Name"
                defaultValue= {custData.firstName}
                InputProps={{
                    readOnly: rOnly,
                  }}

               
              />
            </Grid>

          
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Last Name"
                name="userLastName"
                defaultValue= {custData.lastName}
                InputProps={{
                    readOnly: rOnly,
                  }}
             
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobile"
                label="Mobile Number"
                name="contact"
                defaultValue= {custData.contact}
                InputProps={{
                    readOnly: rOnly,
                  }}
             
               

              />
            </Grid>

            

           {/*} <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                
              />
            </Grid>
                */}

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="New Password"
                name="password"
                InputProps={{
                    readOnly: rOnly,
                  }}
                
              />
            </Grid>

           



            
           
          </Grid>
          {
              
                editChanges === false ? 
                <button onClick={handleUserProfileEdit}>
                Edit Profile
            </button>
            : 
              editChanges === true ?
          <div className="restaurant-signup-submit-button-div">
                  <button className="user-save-button">
                    Save Changes
                  </button>
                  <button  onClick={handleUserCancel} className="user-cancel-button" >
                    Cancel
                  </button>
          </div>
          : 
          null
}

        

         
        </form>
      </div>
      <Box mt={5}>
        
      </Box>
    </Container>





    </div>
);
   

}

export default UserProfile;

