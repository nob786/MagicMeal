import React from "react";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

//==========================REDUX PART============================
import { useDispatch } from "react-redux";
import {
  decCartItemQuantity,
  deleteCartItem,
  incCartItemQuantity,
  pushCartTotal,
  pushItemsLength,
} from "../../Redux/actions/cartAction";

//Context Cart
import { CartContext } from "./Cart";

const CartItems = ({
  itemName,
  description,
  price,
  category,
  _id,
  quantity,
  total,
}) => {
  const [incr, setIncr] = React.useState(1);
  const { deleteMenuItem } = React.useContext(CartContext);
  const dispatch = useDispatch();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const incQuantity = () => {
    dispatch(incCartItemQuantity(_id));
    dispatch(pushCartTotal());
    dispatch(pushItemsLength());
  };
  const decQuantity = () => {
    dispatch(decCartItemQuantity(_id));
    dispatch(pushCartTotal());
    dispatch(pushItemsLength());
  };
  const deleteMenu = () => {
    dispatch(deleteCartItem(_id));
    dispatch(pushCartTotal());
    dispatch(pushItemsLength());
  };

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
        {quantity > 1 ? (
          <button onClick={decQuantity}>
            <RemoveIcon />
          </button>
        ) : (
          <button disabled>
            <RemoveIcon />
          </button>
        )}
        <h4>{quantity}</h4>
        {quantity < 10 ? (
          <button onClick={incQuantity}>
            <AddIcon />
          </button>
        ) : (
          <button disabled>
            <AddIcon />
          </button>
        )}
      </div>

      <div className="cart-item-price">
        <h3>Price: {price}</h3>
      </div>

      <div className="cart-item-total">
        <h3>Total: {total}</h3>
      </div>

      <div className="cart-remove-item">
        <button onClick={deleteMenu}>
          <DeleteIcon
            style={{
              fontSize: "20px",
              color: "red",
            }}
            // color="secondary"
          />
        </button>
      </div>
    </div>
  );
};

export default CartItems;
