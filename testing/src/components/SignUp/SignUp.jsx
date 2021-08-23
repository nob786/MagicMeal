import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signupCustomer } from "../../redux/actions/authActions";

const sendingFormData = new FormData();

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  /*
    const [firstName, setFirstName] = useState({ firstName: "" });
    const [lastName, setlastName] = useState({ lastName: "" });
  const [email, setEmail] = useState({ email: "" });
  const [password, setPassword] = useState({ password: "" });
  const [phone, setPhone] = useState({ phone: "" });
*/
  const [formData, setFormData] = useState({
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

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signupCustomer(formData, history));
  };
  //setFormData({ [name]: value });
  /*
    setFirstName({ [event.target.name]: event.target.value });
    setlastName({ [event.target.name]: event.target.value });
    setEmail({ [event.target.name]: event.target.value });
    setPassword({ [event.target.name]: event.target.value });
    setPhone({ [event.target.name]: event.target.value });
    */
  // setFormData((preVal) => {
  //   if (name === "firstName") {
  //     return {
  //       firstName: value,
  //       lastName: preVal.lastName,
  //       email: preVal.email,
  //       password: preVal.password,
  //       phone: preVal.phone,
  //       role: preVal.role,
  //     };
  //   } else if (name === "lastName") {
  //     return {
  //       firstName: preVal.firstName,
  //       lastName: value,
  //       email: preVal.email,
  //       password: preVal.password,
  //       phone: preVal.phone,
  //       role: preVal.role,
  //     };
  //   } else if (name === "email") {
  //     return {
  //       firstName: preVal.firstName,
  //       lastName: preVal.lastName,
  //       email: value,
  //       password: preVal.password,
  //       phone: preVal.phone,
  //       role: preVal.role,
  //     };
  //   } else if (name === "password") {
  //     return {
  //       firstName: preVal.firstName,
  //       lastName: preVal.lastName,
  //       email: preVal.email,
  //       password: value,
  //       phone: preVal.phone,
  //       role: preVal.role,
  //     };
  //   } else if (name === "phone") {
  //     return {
  //       firstName: preVal.firstName,
  //       lastName: preVal.lastName,
  //       email: preVal.email,
  //       password: preVal.password,
  //       phone: value,
  //       role: preVal.role,
  //     };
  //   }
  // });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(formData);
  //   const { firstName, lastName, email, password, contact, role } = formData;

  //   axios
  //     .post("http://localhost:3001/auth/signup-customer", {
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: email,
  //       password: password,
  //       contact: contact,
  //       role: "customer",
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       window.alert("User Resgister Successfully");
  //       history.push("/foodie-login");
  //     })
  //     .catch((err) => {
  //       window.alert("ERROR");
  //     });
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const { firstName, lastName, email, password, phone, role } = formData;
  //   const res = await fetch("http://localhost:3001/api/end-users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       phone,
  //       role,
  //     }),
  //   });

  //   const data = await res.json();
  //   if (!data) {
  //     window.alert("Could not register");
  //     console.log("Could not register");
  //   } else {
  //     window.alert("Success");
  //     console.log("Success");
  //     history.push("/login");
  //   }

  //   //_______________ Axios API CALL_________________________//
  //   /*sendingFormData.append("firstName", formData.firstName);
  //   sendingFormData.append("lastName", formData.lastName);
  //   sendingFormData.append("email", formData.email);
  //   sendingFormData.append("password", formData.password);
  //   sendingFormData.append("phone", formData.phone);
  //   console.log(sendingFormData);
  //   try {
  //     const res = await axios
  //       .post("http://localhost:3001/api/end-users", sendingFormData)
  //       .then(console.log("Yo hoo"))
  //       .catch("Promise problem.");
  //   } catch (ex) {
  //     console.log(ex);
  //   }*/

  //   //______________________________________________________________________

  //   /*
  //   console.log(formData.firstName);
  //   console.log(formData.lastName);
  //   console.log(formData.email);
  //   console.log(formData.password);
  //   console.log(formData.phone);
  //   console.log(formData);
  //   */
  // };
  return (
    <div className="container">
      <form method="POST" onSubmit={handleSubmit}>
        <h1>User Sign Up</h1>

        <input
          name="firstName"
          type="text"
          placeholder="firstName"
          id="firstName"
          onChange={handleChange}
          value={formData.firstName}
        />
        <br></br>
        <input
          type="text"
          id="lastName"
          placeholder="lastName"
          name="lastName"
          onChange={handleChange}
          value={formData.lastName}
        />
        <br></br>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          value={formData.email}
        />
        <br></br>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={formData.password}
        />
        <br></br>
        <input
          placeholder="contact"
          type="text"
          id="contact"
          name="contact"
          onChange={handleChange}
          value={formData.contact}
        />
        <br></br>
        <button type="submmit"> Sign Up </button>
      </form>
    </div>
  );
};

export default SignUp;
