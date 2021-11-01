import React, { useEffect } from "react";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//==========================REDUX PART============================
import { useDispatch, useSelector  } from "react-redux";


import {CartContext} from './Cart';

const CartItems = ({ itemName, description, price,category,_id,quantity,total}) => {
  const [incr, setIncr]=React.useState(1);
  const {deleteMenuItem} = React.useContext(CartContext);
  const dispatch = useDispatch();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

    const {counter} = useSelector(
      (state) => state.counter
    );




    
  
  
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
      <div className="cart-item-info">
        {/*<div className="product-img">
          <img src={img} alt="" />
        </div>*/}

        <div className="cart-item-title">
          <h3>{itemName}</h3>
          {/*<p>{description}</p>*/}
        </div>


        {/*<div>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </div>
        */}

        <div className="cart-add-minus-quantity">
        {incr > 1 ?  <button onClick={decrement}><RemoveIcon /></button> 
        : <button disabled onClick={decrement}><RemoveIcon /></button>}
           <h4>{incr}</h4>
        {quantity <10 ? <button onClick={increment}><AddIcon /></button>
        :<button disabled onClick={increment}><AddIcon /></button>}
        </div>

        <div className="cart-item-price">
          <h3>Price: {price}</h3>
        </div>

        <div className="cart-item-total">
          <h3>Total: {total}</h3>
        </div>

        <div className="cart-remove-item">
        <button onClick={()=>deleteMenuItem(_id)}><DeleteIcon
            style={{
              fontSize: "20px",
            }}
          /></button>
        </div>
      </div>
  );
};

export default CartItems;
