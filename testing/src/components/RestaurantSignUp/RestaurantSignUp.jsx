import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupRestaurant } from "../../redux/actions/authActions";

const RestaurantSignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    ownerName: "",
    email: "",
    password: "",
    restaurantName: "",
    address: "",
    contact: "",
    category: "",
    role: "restaurant",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    const value = event.target.value;
    const name = event.target.name;

    setFormData({ ...formData, [name]: value });
  };

  //=======================================Handle Submmit================================
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(formData);
    dispatch(signupRestaurant(formData, history));
  };

  return (
    <div>
      <h1>Restaurant Sign Up</h1>
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
          <input
            name="restaurantName"
            type="restaurantName"
            placeholder="restaurantName"
            id="restaurantName"
            onChange={handleChange}
            value={formData.restaurantName}
          />
          <br></br>
          <input
            name="ownerName"
            type="ownerName"
            placeholder="ownerName"
            id="ownerName"
            onChange={handleChange}
            value={formData.ownerName}
          />
          <br></br>
          <input
            name="contact"
            type="contact"
            placeholder="contact"
            id="contact"
            onChange={handleChange}
            value={formData.contact}
          />
          <br></br>
          <input
            name="category"
            type="category"
            placeholder="category"
            id="category"
            onChange={handleChange}
            value={formData.category}
          />
          <br></br>
          <input
            name="address"
            type="address"
            placeholder="address"
            id="address"
            onChange={handleChange}
            value={formData.address}
          />
          <br></br>
          <button type="submmit"> Sign Up </button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantSignUp;
