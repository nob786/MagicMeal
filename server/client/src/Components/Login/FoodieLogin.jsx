import React from "react";
import "./Login.css";

//Validate
import validate from "../../validate";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//=========================Importing=================
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";

//================================MAterial Ui===================*/
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import EmailIcon from "@material-ui/icons/Email";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import LockOpenIcon from "@material-ui/icons/LockOpen";

//Material Ui for Role

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//==========================Redux imports===================================
import { useDispatch } from "react-redux";
import { addCustomerData } from "../../Redux/actions/authentication";
import { addRestaurantData } from "../../Redux/actions/authentication";
import { addAuthCust } from "../../Redux/actions/authentication.js";
import { addAuthRest } from "../../Redux/actions/authentication.js";
// import TitleTag from "../SpecialComp/TitleTag";

toast.configure();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FoodieLogin = () => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState("");
  //Snackbar States
  const [openLoginSuccess, setLoginSuccess] = React.useState(false);

  //Login Name
  const [loginName, setLoginName] = React.useState("");

  const history = useHistory();
  //const history = useHistory();

  const dispatch = useDispatch();

  const handleChange = (event) => {
    // console.log(event.target.value);
    // console.log(event.target.name);
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
    setLoading(true);
    event.preventDefault();
    setErrors(validate(formData));
    // console.log("Errors", errors);
    if (Object.keys(validate(formData)).length === 0) {
      const { email, password } = formData;

      await axios
        .post("/auth/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          setLoading(false);
          /* console.log("Whole response", response);
        console.log("Response data", response.data);
        console.log("token", response.data.token);
        console.log("role", response.data.role); */
          //console.log(role);
          //console.log(token);
          const token = response.data.token;
          const role = response.data.role;
          const customer = response.data.customer;
          const restaurant = response.data.restaurant;
          //console.log("Restaurant Logged In: ",restaurant);

          if (!token) {
            console.log("Your token is empty", token);
          } else {
            //window.alert("User Logged in");
            localStorage.setItem("token", JSON.stringify(token));
            if (role === "restaurant") {
              /*localStorage.setItem(
              "magic-meal-restaurant-token",
              JSON.stringify(token)
            );*/
              setRole("Restaurant");
              //window.alert("Restaurant Logged In");
              dispatch(addAuthRest(true));
              dispatch(addRestaurantData(restaurant));
              //history.push("/admin/menu-items");

              //setLoginName(restaurant.ownerName);
              //setTimeout(() => {  history.push("/admin/dashboard"); }, 3000);
              //setLoginSuccess(true);
              setTimeout(() => {
                window.location.replace("/admin/menu-items");
              }, 1500);

              toast.success(`Welcome! ${restaurant.restaurantName}`, {
                position: toast.POSITION.TOP_CENTER,
              });
              //history.push("/admin/dashboard");
            } else if (role === "customer") {
              /*localStorage.setItem(
              "magic-meal-customer-token",
              JSON.stringify(token)
            );*/
              setRole("Customer");
              //window.alert("Customer Logged In");
              dispatch(addAuthCust(true));
              dispatch(addCustomerData(customer));
              //window.alert(token.data);

              //setLoginName(customer.firstName);
              //setTimeout(() => {  history.push("/"); }, 2000);
              //setLoginSuccess(true);

              history.push("/");
              toast.success(
                `Welcome ${customer.firstName} ${customer.lastName}`,
                { position: toast.POSITION.TOP_CENTER, autoClose: 2000 }
              );
            }
          }
          //history.push("/menus");
        })
        .catch((req) => {
          setLoading(false);
          // //window.alert(req.message);
          toast.error(req.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        });
    } else if (Object.keys(validate(formData)).length > 0) {
      setLoading(false);
    }
  };

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

  const [role, setRole] = React.useState("");

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  //==========================================Success Notifications ===============================

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
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
        {/* <TitleTag title="login form" /> */}

        <div className="form-fields">
          <TextField
            name="email"
            variant="outlined"
            className="email"
            id="input-textfield"
            label="Email"
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            value={formData.email}
            onChange={handleChange}
            helperText={errors.email && errors.email}
            error={errors.email ? true : false}
          />
        </div>

        <div className="form-fields">
          <TextField
            style={{ marginTop: "3%" }}
            name="password"
            variant="outlined"
            className="password"
            id="input-with-icon-textfield"
            label="Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon />
                </InputAdornment>
              ),
            }}
            value={formData.password}
            onChange={handleChange}
            helperText={errors.password && errors.password}
            error={errors.password ? true : false}
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
            {loading === true ? (
              <div
                class="spinner-border"
                role="status"
                style={{ color: "white" }}
              >
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={openLoginSuccess}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
          >
            <Alert
              onClose={handleCloseSnack}
              severity="success"
              sx={{ width: "100%" }}
            >
              Welcome {loginName}!
              <br />
              You have Successfully logged In to {role} Account.
            </Alert>
          </Snackbar>

          <div className="already-login">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
              }}
              to="/foodie-signup"
            >
              Not Registered yet? Signup as a Foodie
            </Link>{" "}
          </div>
        </div>
      </form>
      <br />
      <br />
    </div>
  );
};

export default FoodieLogin;
