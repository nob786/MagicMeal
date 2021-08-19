import React, { Component } from "react";

import "./SingleUserMenu.css";

import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";

//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import {pushMenuId} from "../../Redux/actions/dataActions"

const SingleUserMenu = ({ menu }) => {
  const [value, setValue] = React.useState(4);
  const dispatch = useDispatch();
  const prod =[];
  var id;
  const {clickedMenuId} = useSelector(
    (state) => state.data
  );
  console.log("ABCD"+clickedMenuId);
  const addtoCart=()=>{

    dispatch(pushMenuId(menu));
    
    
    window.alert(menu.itemName+" Item Added to Cart");
  }
  return (
    <div className="Single_Menu" >
      <div className="container">
       <img className="menu_image" src="../Pictures/R7.jpg" />
      </div>
      <div className="menu-details">
      <div className="menu-name">
        <h1>Item Name: {menu.itemName}</h1>
      </div>
      <div>
        <h3>Item Description: {menu.description}</h3>
      </div>

      <div>
        <h3>Price: {menu.price}</h3>
      </div>

      <div>
        <h3>Category: {menu.category}</h3>
      </div>

      </div>

      <div className="rating">
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend" className="rating_title">
            Rating
          </Typography>
          <Rating name="read-only" value={value} readOnly />
        </Box>
      </div>

      <div className="add-to-cart-button">
        <button onClick={addtoCart}>Add to cart</button> 
      </div>

    </div>
  );
};

export default SingleUserMenu;
