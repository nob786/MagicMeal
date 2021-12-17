import React from "react";
import { useEffect } from "react";
import "./Signup.css";

//validate
import validate from "../../validate";

//=========================Importing=================
//import './Signup.css'
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";

//================================MAterial Ui===================*/
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import EmailIcon from "@material-ui/icons/Email";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import Container from "@material-ui/core/Container";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const FoodieSignup = () => {
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const history = useHistory();
  const [signupPic, setSignupPic] = React.useState(true);

  // Similar to componentDidMount and componentDidUpdate:

  const showSignupPic = () => {
    if (window.innerWidth <= 480) {
      setSignupPic(false);
    } else if (window.innerWidth > 480) {
      setSignupPic(true);
    }
  };

  useEffect(() => {
    showSignupPic();
  }, []);

  window.addEventListener("resize", showSignupPic);

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "",
    role: "customer",
  });

  const handleChange = (event) => {
    // console.log(event.target.value);
    // console.log(event.target.name);
    const value = event.target.value;
    const name = event.target.name;

    setFormData({ ...formData, [name]: value });
  };

  //=======================================Handle Submmit================================
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    setErrors(validate(formData));
    console.log("Errors", errors);
    // console.log(formData);

    if (Object.keys(validate(formData)).length === 0) {
      const { firstName, lastName, email, password, contact, role } = formData;

      axios
        .post("/auth/signup-customer", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          contact: contact,
          role: "customer",
        })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          //window.alert("User Resgister Successfully");
          toast.success(`Successfully Signed-up as a Customer`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          history.push("/foodie-login");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          //window.alert("ERROR");
        });
    } else if (Object.keys(validate(formData)).length > 0) {
      setLoading(false);
    }

    /*
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    console.log(contact);
*/

    //console.log(formData);
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      className="foodie_signup_container"
    >
      {/* <div className="foodie_signup_container"> */}
      <form className="foodie_signup_form" onSubmit={handleSubmit}>
        <div className="foodie-signup-form-title">
          <h1>Sign Up as Foodie</h1>
        </div>

        <div className="form-fields">
          <TextField
            variant="outlined"
            name="firstName"
            className="foodie-signup-fields"
            id="input-with-icon-textfield"
            label="First Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            value={formData.firstName}
            helperText={errors.firstName && errors.firstName}
            error={errors.firstName ? true : false}
          />
        </div>

        <div className="form-fields">
          <TextField
            variant="outlined"
            name="lastName"
            className="foodie-signup-fields"
            id="input-with-icon-textfield"
            label="Last Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            value={formData.lastName}
            helperText={errors.lastName && errors.lastName}
            error={errors.lastName ? true : false}
          />
        </div>

        <div className="form-fields">
          <TextField
            variant="outlined"
            name="email"
            className="foodie-signup-fields"
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
            value={formData.email}
            helperText={errors.email && errors.email}
            error={errors.email ? true : false}
          />
        </div>

        <div className="form-fields">
          <TextField
            variant="outlined"
            name="password"
            className="foodie-signup-fields"
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
            value={formData.password}
            helperText={errors.password && errors.password}
            error={errors.password ? true : false}
          />
        </div>

        {/* <div className="form-fields emailcode_field">
                            <TextField
                                className= "emailcode fields"
                                id="input-with-icon-textfield"
                                label="Email Verification Code"
                                autoComplete="current-password"
                                InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <DraftsIcon/>
                                </InputAdornment>
                                ),
                                }}
                             />


                             <div className="emailcode_button">
                             <Button  title="Send Code" height="35px" width="100px" btn_color="orange" />    
                             </div>
                              
                </div>
                            */}

        <div className="form-fields">
          <TextField
            variant="outlined"
            name="contact"
            className="foodie-signup-fields"
            id="input-with-icon-textfield"
            label="Mobile Number"
            type="mobile"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIphoneIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            value={formData.contact}
            helperText={errors.contact && errors.contact}
            error={errors.contact ? true : false}
          />
        </div>

        {/*<div className="form-fields mobilecode_field">
                            <TextField
                                className= "mobilecode fields"
                                id="input-with-icon-textfield"
                                label="Mobile Verification Code"
                                color="primary"
                                InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <ScreenLockPortraitIcon/>
                                </InputAdornment>
                                ),
                                }}
                             />

                             <div className="mobilecode_button">
                             
                                <Button  title="Send Code" height="35px" width="100px" btn_color="orange"/> 
                             </div>
                            
                </div>

                            */}

        <div className="foodie-submit">
          {/*<Button className="foodie_signup_button" title="Signup" height="40px" width="200px" color="white" btn_color="green"
                font_size="20px"
                            />*/}

          <button
            className="foodie-signup-submit-button"
            onClick={handleSubmit}
          >
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

          <div className="already">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
              }}
              to="/foodie-login"
            >
              Already registered? Please Login as a Foodie
            </Link>
          </div>
        </div>
      </form>
      {/* </div> */}
    </Container>
  );
};

export default FoodieSignup;
