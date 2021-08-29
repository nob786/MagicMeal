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
import {pushMenuId} from "../../Redux/actions/cartAction"
import {pushcartRestaurantId} from "../../Redux/actions/cartAction"

const SingleUserMenu = ({ menu, restId }) => {

  const dispatch = useDispatch();
  const {clickedMenuId} = useSelector(
    (state) => state.cart
  );


  //=================

 const fullCartMenu= {
    _id: menu._id,
    itemName: menu.itemName,
    description: menu.description,
    price: menu.price,
    quantity: 1,
    total: menu.price,
  };
  console.log("Full Cart Menu", fullCartMenu);

 // console.log("FullCartMenu",fullCartMenu);



  //===============Cart Resturant==================
  const {cartRestaurantId} = useSelector(
    (state) => state.cart
  );

  
  //console.log("ABCD"+clickedMenuId);
  const addtoCart=()=>{
    if (cartRestaurantId==="")
    {
      dispatch(pushMenuId(fullCartMenu));
      dispatch(pushcartRestaurantId(restId));
    window.alert(menu.itemName+" Item Added to Cart");
  }
  else if (cartRestaurantId===restId){
    dispatch(pushMenuId(fullCartMenu));;
    window.alert(menu.itemName+" Item Added to Cart");
  }else if (restId !== cartRestaurantId )
  window.alert("Different Restaurant Item.");
    
    
    
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
         {/* <Typography component="legend" className="rating_title">
            Rating
          </Typography>
  <Rating name="read-only" value={value} readOnly />*/}
        </Box>
      </div>

      <div className="add-to-cart-button">
        <button onClick={addtoCart}>Add to cart</button> 
      </div>

    </div>
  );
};

export default SingleUserMenu;
