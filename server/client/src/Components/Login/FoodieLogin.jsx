import React from "react";
import "./Login.css";

//=================React  Notification
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
//=========================Importing=================
import { Link, useHistory } from "react-router-dom";
import Button from "../SpecialComp/Button/Button";
import ReactInputVerificationCode from "react-input-verification-code";
import axios from "../../axios";

//================================MAterial Ui===================*/
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import EmailIcon from "@material-ui/icons/Email";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import DraftsIcon from "@material-ui/icons/Drafts";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import ScreenLockPortraitIcon from "@material-ui/icons/ScreenLockPortrait";

//Material Ui for Role
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



//==========================Redux imports===================================
import { useDispatch } from "react-redux";
import { addCustomerData } from "../../Redux/actions/authentication";
import { addRestaurantData } from "../../Redux/actions/authentication";
import {addAuthCust} from "../../Redux/actions/authentication.js"
import {addAuthRest} from "../../Redux/actions/authentication.js"

toast.configure();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FoodieLogin = () => {


  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
//Snackbar States
  const [openLoginSuccess, setLoginSuccess] = React.useState(false);

  //Login Name
  const [loginName, setLoginName] = React.useState("");
 



  const history = useHistory();
  //const history = useHistory();

  const dispatch=useDispatch();

  const handleChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    const value = event.target.value;
    const name = event.target.name;

    setFormData((preVal) => {
      if (name === "email") {
        return {
          email: value,
          password: preVal.password,
        };
      } else if (name === "password") {
        return {
          password: value,
          email: preVal.email,
        };
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    await axios
      .post("/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        /* console.log("Whole response", response);
        console.log("Response data", response.data);
        console.log("token", response.data.token);
        console.log("role", response.data.role); */
        //console.log(role);
        //console.log(token);
        const token = response.data.token;
        const role = response.data.role;
        const customer= response.data.customer;
        const restaurant= response.data.restaurant;
        //console.log("Restaurant Logged In: ",restaurant);

        if (!token) {
          console.log("Your token is empty", token);
        } else {
          //window.alert("User Logged in");
          localStorage.setItem("token", JSON.stringify(token));
          if (role === "restaurant") {
            setRole("Restaurant");
            window.alert("Restaurant Logged In");
            dispatch(addAuthRest(true));
            dispatch(addRestaurantData(restaurant));
            //history.push("/admin/dashboard");

            //setLoginName(restaurant.ownerName);
            //setTimeout(() => {  history.push("/admin/dashboard"); }, 3000);
            //setLoginSuccess(true); 

            toast.success(`welcome ${restaurant.ownerName}! You Have successfully Logged in to ${role} Account`, {position: toast.POSITION.TOP_CENTER});
            history.push("/admin/menu-items");
          } else if (role === "customer"){
            setRole("Customer");
            //window.alert("Customer Logged In");
            dispatch(addAuthCust(true));
            dispatch(addCustomerData(customer));
            //window.alert(token.data);
            

            //setLoginName(customer.firstName);
            //setTimeout(() => {  history.push("/"); }, 2000);
            //setLoginSuccess(true); 
            
            history.push("/");
            toast.success(`Welcome ${customer.firstName} ${customer.lastName}! You Have successfully Logged in to Customer Account`, {position: toast.POSITION.TOP_CENTER ,
            autoClose: 2000});
            
          }
        }
        //history.push("/menus");
      });

    //const data = res.json();
    //console.log("This is the response data", data);
    /*if (!data) {
      window.alert("Could not login");
    } else {
      window.alert("Logged In Successfully");
    }*/

    //console.log(formData);
    /*
      console.log(firstName);
      console.log(lastName);
      console.log(email);
      console.log(password);
      console.log(phone);
  */
  };

  

 
  const [role, setRole] = React.useState("");

  const handleRole = (event) => {
    setRole(event.target.value);
  };


//==========================================Success Notifications ===============================



const handleCloseSnack = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setLoginSuccess(false);
};



  return (
    <div className="foodie_login_container">
      <form className="foodie_login_form">
        <div className="login-form-title">
          <h1>Login Form</h1>
        </div>

        <div className="form-fields">
          <TextField
            name="email"
            className="email"
            id="input-with-icon-textfield"
            label="Email"
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
        </div>

        <div className="form-fields">
          <TextField
            name="password"
            className="password"
            id="input-with-icon-textfield"
            label="Password"
            type="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
        </div>

        {/*  <div className="mobilecode_button1">
          <Button
            title="Send Code to Mobile Number"
            height="35px"
            width="300px"
            btn_color="lightskyblue"
          />
        </div>
        <p>OR</p>
        <div className="mobilecode_button2">
          <Button
            title="Send Code to Email Address"
            height="35px"
            width="300px"
            btn_color="lightskyblue"
          />
        </div>

        <div className="form-fields code_field">
          <TextField
            className="code fields"
            id="input-with-icon-textfield"
            label="Verification Code"
            color="primary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ScreenLockPortraitIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>   
                <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              onChange={handleRole}
            >
              <MenuItem value={"customer"}>Customer</MenuItem>
              <MenuItem value={"restaurant"}>Restaurant</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="form-fields">
          <TextField
            name="role"
            className="password fields"
            id="input-with-icon-textfield"
            label="Role"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
        </div>   
         */}



        <div className="submit">
          {/*<Button className="foodie_signup_button" title="Login" height="40px" width="200px" color="black" btn_color="white"
            font_size="20px"
            />*/}

                  <button className="login-submit-button" onClick={handleSubmit}>
                    Submit
                  </button>
                      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
                       open={openLoginSuccess} autoHideDuration={6000} onClose={handleCloseSnack}>
                          <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                           Welcome {loginName}! 
                           <br />
                            You have Successfully logged In to {role} Account.
                          </Alert>
                      </Snackbar>

          <div className="already-login">
            Not Registered yet?{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
              }}
              to="/foodie-signup"
            >
              Signup
            </Link>{" "}
            as a Foodie
          </div>
        </div>
      </form>
    </div>
  );
};

export default FoodieLogin;



