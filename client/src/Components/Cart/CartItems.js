import React, { useEffect } from "react";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";

import { useDispatch, useSelector  } from "react-redux";
import {pushcartData } from "../../Redux/actions/dataActions";

const CartItems = ({ itemName, description, price,category,_id }) => {
  const [inc, setInc]=React.useState(1);
  let cartT=0;
  let total =0;
  total= price*inc;
  cartT=cartT+total;
  let cartData=[];
  let menu={
    menu_name: itemName,
    menu_price: price,
    menu_total: total,

  }
  useEffect(() => {
    cartData.push(menu);
    
  });

    useDispatch(pushcartData(cartData));
  


    
  
  
  const increment = () => {
    setInc(inc+1);
  //  useDispatch(pushIncDec(cartData));
  }
  const decrement = () => {
    setInc(inc -1);
  }
  
  return (
    <>
      <div className="items-info">
        {/*<div className="product-img">
          <img src={img} alt="" />
        </div>*/}

        <div className="title">
          <h2>{itemName}</h2>
          <p>{description}</p>
        </div>

        <div className="add-minus-quantity">
        {inc > 1 ? <button onClick={decrement}><RemoveIcon /></button> 
        : <button disabled onClick={decrement}><RemoveIcon /></button>}
           <h4>{inc}</h4>
        {inc <10 ? <button onClick={increment}><AddIcon /></button>
        :<button disabled onClick={increment}><AddIcon /></button>}
        </div>

        <div className="price">
          <h3>Price: {price}</h3>
        </div>

        <div className="price">
          <h3>Total: {total}</h3>
          <h3>Total: {cartT}</h3>
        </div>

        <div className="remove-item">
        <button><DeleteIcon
            style={{
              fontSize: "20px",
            }}
          /></button>
        </div>
      </div>
    </>
  );
};

export default CartItems;
