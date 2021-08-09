import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (event) => {
    //console.log(event.target.value);
    //console.log(event.target.name);
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
    const res = await axios
      .post("http://localhost:3001/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        const role = res.data.role;
        const id = res.data.id;
        if (!token) {
          res.status(404).send("Token not found");
        } else {
          window.alert("Your are logged In.");
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("id", JSON.stringify(id));
          if (role === "customer") {
            history.push("/customer/feed");
          } else if (role === "restaurant") {
            history.push("/menus");
          }
        }
      });
    //console.log(formData);
    /*
      console.log(firstName);
      console.log(lastName);
      console.log(email);
      console.log(password);
      console.log(phone);
  */
  };

  return (
    <div>
      <h1>User log In</h1>
      <div className="container">
        <form method="POST" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
          <br></br>
          <input
            name="password"
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
          <br></br>
          <button type="submmit"> Log In </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
