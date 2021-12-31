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
  imageUrl,
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
    <div
      className="cart-menu-div"
      style={{
        marginTop: "2%",
        boxShadow:
          "5px 5px 5px 5px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <button
        // style={{ display: "flex", justifyContent: "flex-end", margin: "5px" }}
        onClick={deleteMenu}
        type="button"
        class="close cart-menu-delete-cross"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="cart-menu-image">
        <img
          style={
            {
              // height: "150px",
              // width: "150px",
              // // display: "flex",
              // float: "left",
            }
          }
          class="card-img"
          src={imageUrl ? imageUrl : null}
        />
      </div>
      <div class="card ">
        <div class="card-body">
          <h5 class="card-title">{itemName}</h5>
          {/* <p class="card-text">{description}</p> */}
          <p class="card-text">Unit Price: {price}</p>
          <p
            // style={{ display: "flex", float: "right" }}
            class="card-text cart-menu-boot-total"
          >
            Total: {total}
          </p>
          {/* <div
            style={{ display: "flex", float: "right" }}
            className="cart-item-price"
          >
            <h3>Unit Price: {price}</h3>
          </div>

          <div className="cart-item-total">
            <h3>Total: {total}</h3>
          </div> */}
          <div
            // style={{ display: "flex", float: "left" }}
            className="cart-add-minus-quantity"
          >
            {quantity > 1 ? (
              <h4 onClick={decQuantity}>
                <RemoveIcon />
              </h4>
            ) : (
              <h4 disabled>
                <RemoveIcon />
              </h4>
            )}
            <h4>{quantity}</h4>
            {quantity < 10 ? (
              <h4 onClick={incQuantity}>
                <AddIcon />
              </h4>
            ) : (
              <h4 disabled>
                <AddIcon />
              </h4>
            )}
          </div>
        </div>
      </div>
      {/* <button className="cart-menu-delete-button">Delete Menu</button> */}
    </div>
    // <div className="cart-item-info">
    //   <div className="product-img">
    //     <img src={imageUrl} alt="" />
    //   </div>

    //   <div className="cart-item-title">
    //     <h3>{itemName}</h3>
    //     {/*<p>{description}</p>*/}
    //   </div>

    //   {/*<div>
    //     <InputLabel id="demo-simple-select-label">Age</InputLabel>
    //       <Select
    //           labelId="demo-simple-select-label"
    //           id="demo-simple-select"
    //           value={age}
    //           label="Age"
    //           onChange={handleChange}
    //       >
    //         <MenuItem value={1}>1</MenuItem>
    //         <MenuItem value={2}>2</MenuItem>
    //         <MenuItem value={3}>3</MenuItem>
    //       </Select>
    //     </div>
    //     */}

    //   <div className="cart-add-minus-quantity">
    //     {quantity > 1 ? (
    //       <button onClick={decQuantity}>
    //         <RemoveIcon />
    //       </button>
    //     ) : (
    //       <button disabled>
    //         <RemoveIcon />
    //       </button>
    //     )}
    //     <h4>{quantity}</h4>
    //     {quantity < 10 ? (
    //       <button onClick={incQuantity}>
    //         <AddIcon />
    //       </button>
    //     ) : (
    //       <button disabled>
    //         <AddIcon />
    //       </button>
    //     )}
    //   </div>

    //   <div className="cart-item-price">
    //     <h3>Price: {price}</h3>
    //   </div>

    //   <div className="cart-item-total">
    //     <h3>Total: {total}</h3>
    //   </div>

    //   <div className="cart-remove-item">
    //     <button onClick={deleteMenu}>
    //       <DeleteIcon
    //         style={{
    //           fontSize: "20px",
    //           color: "red",
    //         }}
    //         // color="secondary"
    //       />
    //     </button>
    //   </div>
    // </div>
  );
};

export default CartItems;
