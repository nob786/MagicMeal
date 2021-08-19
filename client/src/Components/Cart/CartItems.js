import React from "react";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";

const CartItems = ({ itemName, description, price,category }) => {
  return (
    <>
      <div className="items-info">
        <div className="product-img">
         {/* <img src={img} alt="" />*/}
        </div>

        <div className="title">
          <h2>{itemName}</h2>
          <p>{description}</p>
        </div>

        <div className="add-minus-quantity">
        <button><RemoveIcon /></button>
          <input type="text" placeholder="1" />
          <button><AddIcon /></button>
        </div>

        <div className="price">
          <h3>{price}</h3>
        </div>

        <div className="remove-item">
          <DeleteIcon
            style={{
              fontSize: "20px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CartItems;
