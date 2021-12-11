import React, { Component } from "react";

import "./SingleMenu.css";

import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const SingleMenu = ({ menu, key }) => {
  const [value, setValue] = React.useState();
  const prod = [];
  var id;

  const onMenuEditClick = () => {
    setValue(menu);
  };
  return (
    <div
      style={{
        boxShadow:
          "5px 5px 10px 5px rgba(0, 0, 0, 0.2),0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
      class="card w-75"
    >
      <img src="../Pictures/R7.jpg" />{" "}
      <div class="card-body ">
        <h5
          style={{ color: "#fe724c", fontFamily: "cursive" }}
          class="card-title text-center"
        >
          {menu.itemName} {console.log("key", key)}
        </h5>
        <div id="accordion">
          <div class="card ">
            <div class="card-header text-center" id="headingOne">
              <h5 class="mb-0 ">
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
        <p class="card-text text-center mt-2">{menu.price} Rs.</p>
        <p class="card-text text-center mt-2">{menu.category}</p>

        <a
          //onClick={addtoCart}
          style={{
            width: "100%",
            color: "white",
            backgroundColor: "#fe724c",
            border: "none",
          }}
          onClick={onMenuEditClick}
          className="boot-user-add-to-cart-button"
          class="btn text-center mt-4 boot-user-add-to-cart-button"
          data-toggle="modal"
          data-target="#rest-menu-update-modal"
          // data-whatever="@getbootstrap"
          // data-whatever="@mdo"
        >
          Edit Menu
        </a>
        <a
          //onClick={addtoCart}
          style={{
            width: "100%",
            color: "white",
            backgroundColor: "#fe724c",
            border: "none",
          }}
          className="boot-user-add-to-cart-button"
          class="btn text-center mt-4 boot-user-add-to-cart-button"
        >
          Delete Menu
        </a>
      </div>
      {/* =========================Boot Strap Edit Modal ========================== */}
      <div
        style={{ zIndex: 2000 }}
        class="modal fade"
        id="rest-menu-update-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              style={{ backgroundColor: "#fe724c", color: "white" }}
              class="modal-header "
            >
              <h5 class="modal-title justify-center" id="exampleModalLabel">
                Edit Restaurant Menu
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Menu Name:
                  </label>
                  <input
                    defaultValue={menu.itemName}
                    type="text"
                    class="form-control"
                    id="recipient-name"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Price:
                  </label>
                  <input
                    defaultValue={menu.price}
                    type="text"
                    class="form-control"
                    id="recipient-name"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Category:
                  </label>
                  <input
                    defaultValue={menu.category}
                    type="text"
                    class="form-control"
                    id="recipient-name"
                  />
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">
                    Description:
                  </label>
                  <textarea
                    defaultValue={menu.description}
                    maxLength={200}
                    class="form-control"
                    id="message-text"
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="restaurant-single-menu">
    //   <div className="restaurant-single-menu-container">
    //     <img className="restaurant-menu-image" src="../Pictures/R7.jpg" />
    //   </div>

    //   <div className="restaurant-menu-details">
    //     <div className="restaurant-menu-name">
    //       {" "}
    //       <h2>{menu.itemName}</h2>{" "}
    //     </div>
    //     <br />

    //     <div className="restaurant-menu-description">{menu.description}</div>
    //     <br />
    //     <div className="restaurant-menu-category">
    //       Category: {menu.category}
    //     </div>
    //     <br />
    //     <div className="restaurant-menu-price">Price: {menu.price} Rs.</div>
    //   </div>
    //   <div>
    //     <button className="restaurant-delete-menu-button">
    //       <DeleteIcon /> Delete
    //     </button>
    //   </div>

    //   <div>
    //     <button className="restaurant-edit-menu-button">
    //       <EditIcon /> Edit
    //     </button>
    //   </div>
    // </div>
  );
};

export default SingleMenu;
