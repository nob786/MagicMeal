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

const SingleMenu = ({ menu }) => {
  const [value, setValue] = React.useState(4);
  const prod = [];
  var id;
  return (
    <div className="restaurant-single-menu">
      <div className="restaurant-single-menu-container">
        <img className="restaurant-menu-image" src="../Pictures/R7.jpg" />
      </div>

      <div className="restaurant-menu-details">
        <div className="restaurant-menu-name">
          {" "}
          <h2>{menu.itemName}</h2>{" "}
        </div>
        <br />

        <div className="restaurant-menu-description">{menu.description}</div>
        <br />
        <div className="restaurant-menu-category">
          Category: {menu.category}
        </div>
        <br />
        <div className="restaurant-menu-price">Price: {menu.price} Rs.</div>
      </div>
      <div>
        <button className="restaurant-delete-menu-button">
          <DeleteIcon /> Delete
        </button>
      </div>

      <div>
        <button className="restaurant-edit-menu-button">
          <EditIcon /> Edit
        </button>
      </div>
    </div>
  );
};

export default SingleMenu;
