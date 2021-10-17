import React, { Component } from "react";

import "./SingleRestaurant.css";

import { Link, useHistory } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MenuItems from "./MenuItems";


//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import {pushRestaurantId} from "../../Redux/actions/dataActions"

const SingleRestaurant = ({ restaurant }) => {
  const [value, setValue] = React.useState(4);


  const history = useHistory();
  const dispatch = useDispatch();


  const onRestaurantClick=()=>{
    dispatch(pushRestaurantId(restaurant._id));
    /*window.alert(restaurant._id);*/
    history.push("/user-menu-items");
  }
  return (
    <div className="Single_Restaurant">
      <div className="restaurant-image-container">
        <img className="restaurant_image" src={"../Pictures/R7.jpg"} />
      </div>
     {/*} <div>
        <FavoriteBorderIcon
          style={{ fontSize: 40, color: "red", float: "left" }}
        />
  </div>*/}
      <div>
        <Link onClick={onRestaurantClick}><h1 className="restaurant-title">{restaurant.restaurantName}</h1></Link>
      </div>
      <div className="restaurant-address">
        {restaurant.address}
      </div>

      <div className="rating">
        <Box component="fieldset" mb={3} borderColor="transparent">         
          <Rating name="read-only" value={value} readOnly />
        </Box>
      </div>
    </div>
  );
};

export default SingleRestaurant;
