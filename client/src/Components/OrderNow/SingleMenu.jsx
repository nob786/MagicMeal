import React, { Component } from "react";

import "./SingleMenu.css";

import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";


import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const SingleMenu = ({ menu }) => {
  const [value, setValue] = React.useState(4);
  const prod =[];
  var id;
  return (
    <Grid className="Single_Menu" xs={20}>
      <div className="container">
       <img className="menu_image" src="../Pictures/R7.jpg" />
      </div>
      <div className="menu-name">
        
        <h1 >Item Name: {menu.itemName}ansajsn</h1>
      </div>
      <div>
        <h3>Item Description: {menu.description}</h3>
      </div>

      <div>
        <h3>Price: {menu.price}</h3>
      </div>

      <div>
        <h3>Category: {menu.category}</h3>
      </div>

      <div className="rating">
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend" className="rating_title">
            Rating
          </Typography>
          <Rating name="read-only" value={value} readOnly />
        </Box>
      </div>

      <div>
        <button><DeleteIcon/></button>
      </div>

      <div>
        <button><EditIcon/></button>
        
      </div>


    </Grid>
  );
};

export default SingleMenu;
