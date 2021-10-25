import React, { Component } from "react";

import "./SingleUserMenu.css";

import { Link , useHistory} from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";

//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import {pushItemsLength, pushMenuId} from "../../Redux/actions/cartAction"
import {pushcartRestaurantId} from "../../Redux/actions/cartAction"
import {pushcartRestaurant} from "../../Redux/actions/cartAction"





const SingleUserMenu = ({ menu, restId , restName, cont}) => {

  const dispatch = useDispatch();

//====================================Redux Selectors=========================
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
 // console.log("Full Cart Menu", fullCartMenu);

 // console.log("FullCartMenu",fullCartMenu);

 const restaurantData= {
   restaurantName: restName,
   contact: cont,
   restaurantId: restId,

 }



  //===============Cart Resturant==================
  const {cartRestaurantId} = useSelector(
    (state) => state.cart
  );

 

  //==================Redux Cust Auth=============
  const history = useHistory();
  const {authCust} = useSelector(
    (state) => state.auth
  );
  //console.log("ABCD"+clickedMenuId);
  const addtoCart=()=>{
    dispatch(pushItemsLength(clickedMenuId.length));
    if (authCust===true) {
    if (cartRestaurantId==="")
    {
      dispatch(pushMenuId(fullCartMenu));
      dispatch(pushcartRestaurantId(restId));
      dispatch(pushcartRestaurant(restaurantData));      
    window.alert(menu.itemName+" Item Added to Cart");
    dispatch(pushItemsLength(clickedMenuId.length));
  }
  else if (cartRestaurantId===restId){
    dispatch(pushMenuId(fullCartMenu));;
    window.alert(menu.itemName+" Item Added to Cart");
   dispatch(pushItemsLength(clickedMenuId.length));
  }else if (restId !== cartRestaurantId )
  window.alert("Different Restaurant Item.");
}
else {
  history.push("/foodie-login");
}

    
    
    
  }
  return (
    <div className="single_user_menu_box" >


      <div className="single_user_menu" >

      <div className="user-menu-container">
         <img className="user-menu-image" src="../Pictures/R7.jpg" />
      </div>
      
      <div className="user-menu-details">
        <div className="user-menu-name">
          {menu.itemName}
        </div>
      
        <div className="user-menu-description">
        Description: <span style={{fontWeight: "normal"}}>{menu.description}</span> 
        </div>

        <div className="user-menu-price">
            Price: {menu.price}
        </div>
      
      </div>

      </div>

      

      
        <button className="user-add-to-cart-button" onClick={addtoCart}>Add to cart</button> 
      

      

      

    </div>
  );
};

export default SingleUserMenu;
