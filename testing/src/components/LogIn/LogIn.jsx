import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../redux/actions/authActions";
const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    const value = event.target.value;
    const name = event.target.name;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(formData, history));
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
