import React, { createContext } from "react";
import { Link } from "react-router-dom";





import "./Cart.css";


import ContexCart from "./ContexCart";



//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import {pushMenuId} from "../../Redux/actions/dataActions"



export  const CartContext = createContext();

const Cart = () => {


  const {clickedMenuId} = useSelector(
    (state) => state.data
  );

  const deleteMenuItem=(menuId)=>{
    window.alert(menuId);
  }

  return (
    <CartContext.Provider value={{clickedMenuId,deleteMenuItem}}>
    <ContexCart/>
    </CartContext.Provider>
  );
};

export default Cart;
