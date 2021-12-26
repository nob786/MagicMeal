import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";

//=============Css Import =================
import "./SingleUserMenu.css";

//==================MAterial Ui Imports================================
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import { pushItemsLength, pushMenuId } from "../../Redux/actions/cartAction";
import { pushcartRestaurantId } from "../../Redux/actions/cartAction";
import { pushcartRestaurant } from "../../Redux/actions/cartAction";
//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SingleUserMenu = ({ menu, restId, restName, cont, quantity }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //====================================Redux Selectors=========================
  const { clickedMenuId } = useSelector((state) => state.cart);
  const menuCheck = clickedMenuId.filter((n) => n._id === menu._id);
  //=================

  const fullCartMenu = {
    _id: menu._id,
    itemName: menu.itemName,
    description: menu.description,
    price: menu.price,
    quantity: quantity,
    total: menu.price * quantity,
  };
  // console.log("Full Cart Menu", fullCartMenu);

  // console.log("FullCartMenu",fullCartMenu);

  const restaurantData = {
    restaurantName: restName,
    contact: cont,
    restaurantId: restId,
  };

  //===============Cart Resturant==================
  const { cartRestaurantId } = useSelector((state) => state.cart);

  //==================Redux Cust Auth=============
  const history = useHistory();
  const { authCust } = useSelector((state) => state.auth);
  //console.log("ABCD"+clickedMenuId);
  const alreadyInCart = () => {
    toast.info(`Already in Cart`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  //===============================Add to Cart Handle=================================
  const addtoCart = () => {
    //dispatch(pushItemsLength(clickedMenuId.length));

    if (authCust === true) {
      if (cartRestaurantId === "" && clickedMenuId === "") {
        dispatch(pushMenuId(fullCartMenu));
        dispatch(pushcartRestaurantId(restId));
        dispatch(pushcartRestaurant(restaurantData));
        dispatch(pushItemsLength());
        // window.alert(menu.itemName + " Item Added to Cart");
        toast.info(`${menu.itemName} Added to Cart`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else if (cartRestaurantId === restId) {
        dispatch(pushMenuId(fullCartMenu));
        dispatch(pushItemsLength());
        // window.alert(menu.itemName + " Item Added to Cart");
        toast.info(`${menu.itemName} Added to Cart`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else if (cartRestaurantId !== restId && clickedMenuId.length === 0) {
        dispatch(pushMenuId(fullCartMenu));
        dispatch(pushcartRestaurantId(restId));
        dispatch(pushcartRestaurant(restaurantData));
        dispatch(pushItemsLength());
        // window.alert(menu.itemName + " Item Added to Cart");
        toast.info(`${menu.itemName} Added to Cart`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else if (cartRestaurantId !== restId && clickedMenuId.length !== 0)
        setOpen(true);
    } else {
      history.push("/foodie-login");
      toast.info(`Please Log In First to use Cart`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
  return (
    <div
      style={{
        boxShadow:
          "5px 5px 10px 5px rgba(0, 0, 0, 0.2),0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        maxWidth: "350px",
        minHeight: "200px",
      }}
      class="card "
    >
      <div class="row no-gutters">
        <div class="col-sm-5">
          <img
            style={{ height: "200px", maxWidth: "400px" }}
            class="card-img"
            src={menu.imageUrl ? menu.imageUrl : "../Pictures/R7.jpg"}
          />
        </div>
        <div class="col-sm-7">
          <div class="card-body">
            <h5
              style={{
                color: "#fe724c",
                fontFamily: "cursive",
                fontWeight: "900",
              }}
              class="card-title text-center"
            >
              {menu.itemName}
            </h5>

            <div id="accordion">
              {" "}
              <div class="card ">
                {" "}
                <div class="card-header text-center" id="headingOne">
                  {" "}
                  <h5 class="mb-0 ">
                    {" "}
                    <button
                      style={{ textDecoration: "none" }}
                      className="boot-menu-button"
                      class="boot-menu-button "
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Menu Description
                    </button>
                  </h5>
                </div>
                <div
                  style={{ fontSize: "12px" }}
                  id="collapseOne"
                  class="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div class="card-body">{menu.description}</div>
                </div>
              </div>
            </div>

            <p style={{ textAlign: "center" }} class="card-text">
              {menu.price} Rs.
            </p>
            {!menuCheck.length > 0 ? (
              <a
                onClick={addtoCart}
                style={{
                  width: "100%",
                  color: "white",
                  backgroundColor: "#fe724c",
                  border: "none",
                }}
                className="boot-user-add-to-cart-button"
                class="btn text-center mt-4 boot-user-add-to-cart-button"
              >
                Add to Cart
              </a>
            ) : (
              <button
                disabled
                onClick={alreadyInCart}
                style={{
                  width: "100%",
                  color: "white",
                  backgroundColor: "#fe724c",
                  border: "none",
                }}
                className="boot-user-add-to-cart-button"
                class="btn text-center mt-4 boot-user-add-to-cart-button"
              >
                Added to Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"You have Selected Menu from different Restaurant"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you want to add this menu then Please empty your previous cart or
            continue with your previous cart
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="cart-modal-button" onClick={handleClose}>
            Continue Shopping
          </button>
          <button className="cart-modal-button-continue" onClick={handleClose}>
            Empty Cart
          </button>
        </DialogActions>
      </Dialog>
    </div>

    // <div
    //   style={{
    //     boxShadow:
    //       "5px 5px 10px 5px rgba(0, 0, 0, 0.2),0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    //   }}
    //   class="card w-75"
    // >
    //   <img className="user-menu-image" src="../Pictures/R7.jpg" />{" "}
    //   <div class="card-body ">
    //     <h5
    //       style={{ color: "#fe724c", fontFamily: "cursive" }}
    //       class="card-title text-center"
    //     >
    //       {menu.itemName}
    //     </h5>

    //     <div id="accordion">
    //       <div class="card ">
    //         <div class="card-header text-center" id="headingOne">
    //           <h5 class="mb-0 ">
    //             <button
    //               className="boot-menu-button"
    //               class="boot-menu-button "
    //               data-toggle="collapse"
    //               data-target="#collapseOne"
    //               aria-expanded="true"
    //               aria-controls="collapseOne"
    //             >
    //               Menu Description
    //             </button>
    //           </h5>
    //         </div>

    //         <div
    //           id="collapseOne"
    //           class="collapse"
    //           aria-labelledby="headingOne"
    //           data-parent="#accordion"
    //         >
    //           <div class="card-body">{menu.description}</div>
    //         </div>
    //       </div>
    //     </div>
    //     <p class="card-text text-center mt-2">{menu.price} Rs.</p>
    //     <a
    //       onClick={addtoCart}
    //       style={{
    //         width: "100%",
    //         color: "white",
    //         backgroundColor: "#fe724c",
    //         border: "none",
    //       }}
    //       className="boot-user-add-to-cart-button"
    //       class="btn text-center mt-4 boot-user-add-to-cart-button"
    //     >
    //       Add to Cart
    //     </a>
    //   </div>
    // </div>
    // <div className="single_user_menu_box">
    //   <div className="user-menu-image-container">
    //     <img className="user-menu-image" src="../Pictures/R7.jpg" />
    //   </div>

    //   <div className="user-menu-details">
    //     <div className="user-menu-name">{menu.itemName}</div>

    //     <div className="user-menu-price">{menu.price} Rs.</div>
    //   </div>
    //   <div className="user-menu-description">
    //     <span style={{ fontWeight: "normal" }}>{menu.description}</span>
    //   </div>

    //   <button className="user-add-to-cart-button" onClick={addtoCart}>
    //     Add to cart
    //   </button>
    // </div>
  );
};

export default SingleUserMenu;
