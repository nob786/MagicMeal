import React, { useEffect } from "react";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";

//==========================REDUX PART============================
import { useDispatch, useSelector  } from "react-redux";
import {pushcartData } from "../../Redux/actions/dataActions";
import { inc } from "../../Redux/actions/counter";
import { dec } from "../../Redux/actions/counter";

import {CartContext} from './Cart';

const CartItems = ({ itemName, description, price,category,_id}) => {
  const [incr, setIncr]=React.useState(1);
  const {deleteMenuItem} = React.useContext(CartContext);
  const dispatch = useDispatch();

    const {counter} = useSelector(
      (state) => state.counter
    );

    
  let cartT=0;
  let total =0;
  total= price*incr;
  cartT=cartT+total;
  let cartData=[];
  /*let menu={
    menu_name: itemName,
    menu_price: price,
    menu_total: total,

  }
  useEffect(() => {
    cartData.push(menu);
    
  });*/

    //useDispatch(pushcartData(cartData));




    
  
  
  const increment = () => {
    
    //dispatch(inc());
    setIncr(incr+1);
  //  useDispatch(pushIncDec(cartData));
  }
  const decrement = () => {
    setIncr(incr -1);
    //dispatch(dec());
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
        {incr > 1 ? <button onClick={decrement}><RemoveIcon /></button> 
        : <button disabled onClick={decrement}><RemoveIcon /></button>}
           <h4>{incr}</h4>
        {incr <10 ? <button onClick={increment}><AddIcon /></button>
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
        <button onClick={()=>deleteMenuItem(_id)}><DeleteIcon
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
