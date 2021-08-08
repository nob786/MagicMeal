import React, { createContext } from "react";
import { Link } from "react-router-dom";





import "./Cart.css";

import { Products } from "./Products.js";
import ContexCart from "./ContexCart";




export  const CartContext = createContext();

const Cart = () => {


  return (
    <CartContext.Provider value={Products}>
    <ContexCart/>
    </CartContext.Provider>
  );
};

export default Cart;
