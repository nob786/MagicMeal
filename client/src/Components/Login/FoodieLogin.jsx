import React from "react";
import "./Login.css";

//=========================Importing=================
import { Link, useHistory } from "react-router-dom";
import Button from "../SpecialComp/Button/Button";
import ReactInputVerificationCode from "react-input-verification-code";
import axios from "axios";

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
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const FoodieLogin = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  //const history = useHistory();

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
      }else if (name === "role") {
        return {
          role: value,
          email: preVal.email,
          password: preVal.password,
        };
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password ,role} = formData;

    axios
      .post("http://localhost:3001/auth/login", {
        email: email,
        password: password,
        role,
      })
      .then((response) => {
        console.log(response.data);
        window.alert("User Logged in");
        localStorage.setItem("token", JSON.stringify(response.data));
        history.push("/admin/menu-items");
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


  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  
    const classes = useStyles();
    const [role, setRole] = React.useState('');
  
    const handleRole = (event) => {
      setRole(event.target.value);
    };

  return (
    <div className="foodie_login_container">
      <form className="foodie_login_form">
        <div className="title">
          <h1>Login</h1>
        </div>

        <div className="form-fields">
          <TextField
            name="email"
            className="email fields"
            id="input-with-icon-textfield"
            label="Email or Phone"
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
            className="password fields"
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
        </div>    */}


        <div>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          onChange={handleRole}
        >
          <MenuItem value={10}>Customer</MenuItem>
          <MenuItem value={20}>Restaurant</MenuItem>
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
                <InputAdornment position="start">
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
        </div>

        <div className="submit">
          {/*<Button className="foodie_signup_button" title="Login" height="40px" width="200px" color="black" btn_color="white"
            font_size="20px"
            />*/}

          <button onClick={handleSubmit}>Submit</button>

          <div className="already">
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
