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

//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import { pushItemsLength, pushMenuId } from "../../Redux/actions/cartAction";
import { pushcartRestaurantId } from "../../Redux/actions/cartAction";
import { pushcartRestaurant } from "../../Redux/actions/cartAction";
//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const SingleUserMenu = ({ menu, restId, restName, cont, quantity }) => {
  const dispatch = useDispatch();

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
      if (cartRestaurantId === "") {
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
      } else if (restId !== cartRestaurantId)
        window.alert("Different Restaurant Item.");
    } else {
      history.push("/foodie-login");
    }
  };
  return (
    <div
      style={{
        boxShadow:
          "5px 5px 10px 5px rgba(0, 0, 0, 0.2),0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
      class="card h-60"
    >
      <div class="row no-gutters">
        <div class="col-sm-5">
          <img
            style={{ height: "100%" }}
            class="card-img"
            src="../Pictures/R7.jpg"
          />
        </div>
        <div class="col-sm-7">
          <div class="card-body">
            <h5
              style={{ color: "#fe724c", fontFamily: "cursive" }}
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
                  id="collapseOne"
                  class="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div class="card-body">{menu.description}</div>
                </div>
              </div>
            </div>

            <p class="card-text">{menu.price} Rs.</p>
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
              <a
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
              </a>
            )}
          </div>
        </div>
      </div>
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
