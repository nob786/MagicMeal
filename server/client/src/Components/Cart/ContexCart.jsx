import React, { useEffect } from "react";

import { Scrollbars } from "react-custom-scrollbars-2";
import CartItems from "./CartItems";
//import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import Checkout from "../Checkout/Checkout";
import TextField from "@material-ui/core/TextField";
import "./Cart.css";

import { CartContext } from "./Cart.jsx";

//============================React Redux ====================================
import { useDispatch, useSelector } from "react-redux";
import { pushItemsLength } from "../../Redux/actions/cartAction";
import { pushCartTotal } from "../../Redux/actions/cartAction";
import { toast } from "react-toastify";

function ContexCart() {
  // Sates and Variables
  const data = React.useContext(CartContext);
  const item = data.clickedMenuId;
  const { checkItems } = React.useContext(CartContext);
  let total = 0;
  const dispatch = useDispatch();
  const { cartTotal } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(pushCartTotal());
  }, []);

  /*useEffect(() => {
      // Update the document title using the browser API
      checkItems(total);
    });*/

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 2px",
    },
  }))(Badge);

  const handleClick = () => {
    <Checkout />;
    console.log("jsdjsdhj");
  };

  //const cartItems = () => {
  //dispatch(pushItemsLength(item.length));
  //};

  useEffect(() => {
    // cartItems();
  }, []);

  return (
    <>
      {/*} <header>
          <div className="continue-shopping">
            <ArrowBackIcon className="arrow-icon" />
            <h3>Continue Shopping</h3>
          </div>
  
          <div className="cart-icon">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={4} color="primary">
                <ShoppingCartIcon
                  style={{
                    fontSize: "30px",
                  }}
                />
              </StyledBadge>
            </IconButton>
          </div>
                </header>*/}

      <section className="main-cart-section">
        {item.length === 0 ? (
          <p>Cart is Empty.</p>
        ) : (
          <p>
            Cart Items: <span className="total-items-count">{item.length}</span>
          </p>
        )}

        <div className="cart-items">
          <div className="cart-items-container">
            {/* <Scrollbars> */}
            {item.map((currItem) => {
              return <CartItems key={currItem.id} {...currItem} />;
            })}
            {/* </Scrollbars> */}
          </div>
        </div>

        <div className="cart-total">
          <h3>
            {/*totalPrice()*/}
            Cart Total: <span>{cartTotal} </span>
          </h3>
          {/*<button onClick={handleClick}>Checkout</button>*/}
        </div>
      </section>
    </>
  );
}

export default ContexCart;
