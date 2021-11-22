import React, { Component } from "react";

import "./SingleRestaurant.css";

import { Link, useHistory } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import { pushRestaurantId } from "../../Redux/actions/dataActions";
import { pushClickedRestaurantData } from "../../Redux/actions/dataActions";

const SingleRestaurant = ({ restaurant }) => {
  const [value, setValue] = React.useState();

  const history = useHistory();
  const dispatch = useDispatch();

  const onRestaurantClick = () => {
    dispatch(pushRestaurantId(restaurant._id));
    dispatch(pushClickedRestaurantData(restaurant));
    /*window.alert(restaurant._id);*/
    history.push("/user-menu-items");
  };
  return (
    <div onClick={onRestaurantClick} style={{ textDecoration: "none" }}>
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
          <h1 className="restaurant-title">{restaurant.restaurantName}</h1>
        </div>
        <div className="restaurant-address">{restaurant.address}</div>

        <div className="rating">
          <br />
          <br />
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating
              name="half-rating-read"
              defaultValue={4.2}
              precision={0.1}
              readOnly
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SingleRestaurant;
