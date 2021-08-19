import React from 'react';
import './Signup.css'

//=========================Importing=================
//import './Signup.css'
import {Link, useHistory} from "react-router-dom";
import Button from '../SpecialComp/Button/Button';
import ReactInputVerificationCode from 'react-input-verification-code';
import axios from 'axios'




//================================MAterial Ui===================*/
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DraftsIcon from '@material-ui/icons/Drafts';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import ScreenLockPortraitIcon from '@material-ui/icons/ScreenLockPortrait';




const FoodieSignup = () => {

  const history = useHistory();

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "",
    role: "customer",
  });

 

  const handleChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    const value = event.target.value;
    const name = event.target.name;

    //setFormData({ [name]: value });
    /*
    setFirstName({ [event.target.name]: event.target.value });
    setlastName({ [event.target.name]: event.target.value });
    setEmail({ [event.target.name]: event.target.value });
    setPassword({ [event.target.name]: event.target.value });
    setPhone({ [event.target.name]: event.target.value });
    */
    setFormData((preVal) => {
      if (name === "firstName") {
        return {
          firstName: value,
          lastName: preVal.lastName,
          email: preVal.email,
          password: preVal.password,
          contact: preVal.contact,
        };
      } else if (name === "lastName") {
        return {
          firstName:  preVal.value,
          lastName: value,
          email: preVal.email,
          password: preVal.password,
          contact: preVal.contact,
        };
      }else if (name === "email") {
        return {
          firstName: preVal.firstName,
          lastName: preVal.lastName,
          email: value,
          password: preVal.password,
          contact: preVal.contact,
        };
      } else if (name === "password") {
        return {
          firstName: preVal.firstName,
          lastName: preVal.lastName,
          email: preVal.email,
          password: value,
          contact: preVal.contact,
        };
      }else if (name === "contact") {
        return {
          firstName: preVal.firstName,
          lastName: preVal.lastName,
          email: preVal.email,
          password: preVal.password,
          contact: value,
        };
      }

    });
  };






  //=======================================Handle Submmit================================
  const  handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);  
    const {
    firstName,
    lastName,
    email,
    password,
    contact,
    role,} =formData;

    axios.post("http://localhost:3001/auth/signup-customer",{
    firstName: firstName,
    lastName: lastName ,
    email: email,
    password: password,
    contact: contact,
    role: "customer",
    })
    .then((res)=>{
      console.log(res.data);
      window.alert("User Resgister Successfully");
      history.push("/foodie-login");
    }).catch((err)=>{
      window.alert("ERROR");
    })



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
        <div className="foodie_signup_container">

            <div className="image">
                <img src="./Pictures/foodiesignup.jpg" alt=""/>

            </div>

            <form className="foodie_signup_form" onSubmit={handleSubmit}>

                <div className="title">
                <h1>Sign Up</h1>
                </div>


                <div className="form-fields">
                            <TextField
                                name="firstName"
                                className= "firstname fields"
                                id="input-with-icon-textfield"
                                label="First Name"
                                InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                                ),
                                }}

                                onChange ={handleChange}
                             />
                </div>

                <div className="form-fields">
                            <TextField
                                name="lastName"
                                className= "lastname fields"
                                id="input-with-icon-textfield"
                                label="Last Name"
                                InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                                ),
                                }}
                                onChange ={handleChange}
                             />
                </div>


                <div className="form-fields">
                            <TextField
                                name="email"
                                className= "password fields"
                                id="input-with-icon-textfield"
                                label="Email"
                                type="email"
                                InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    < EmailIcon/>
                                </InputAdornment>
                                ),
                                }}

                                onChange ={handleChange}
                             />

                        
                </div>




                <div className="form-fields">
                            <TextField
                                name="password"
                                className= "password fields"
                                id="input-with-icon-textfield"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <LockOpenIcon/>
                                </InputAdornment>
                                ),
                                }}

                                onChange ={handleChange}
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
                                name="contact"
                                className= "mobilenumber fields"
                                id="input-with-icon-textfield"
                                label="Mobile Number"
                                type="mobile"
                                autoComplete="current-password"
                                InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIphoneIcon/>
                                </InputAdornment>
                                ),
                                }}
                                onChange ={handleChange}
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


                
                <div className="submit">
                {/*<Button className="foodie_signup_button" title="Signup" height="40px" width="200px" color="white" btn_color="green"
                font_size="20px"
                            />*/}

                            <button className="foodie_signup_button" onClick={handleSubmit}>Submit</button>

                <div className="already">
                Already registered? Please <Link style= {{textDecoration: 'none',color: 'black', fontWeight: 'bold' }} to= "/foodie-login">Login</Link> as a Foodie
                </div>
                
                </div>
                   
            </form>
        </div>
        
     );
}
 
export default FoodieSignup;