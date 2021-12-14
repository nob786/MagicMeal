import React, { Component } from "react";

import "./SingleMenu.css";

import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
//Material ui dialog testing
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@mui/material/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Checkbox from "@material-ui/core/Checkbox";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import axios from "../../axios";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const SingleMenu = ({ menu, key }) => {
  const [value, setValue] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [editMenuData, setEditMenuData] = React.useState({
    itemName: menu.itemName,
    price: menu.price,
    category: menu.category,
    description: menu.description,
  });
  const prod = [];
  var id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setEditMenuData({ ...editMenuData, [name]: value });
    console.log("edit menu dat", editMenuData);
  };

  // const onMenuEditClick = () => {
  //   setValue(menu);
  // };

  const handleDeleteMenu = () => {
    const itemId = menu._id;
    console.log("Item id", itemId);
    axios
      .delete(`/item/delete-item/${itemId}`, {
        headers: {
          authorization:
            localStorage.getItem("token") !== null
              ? JSON.parse(localStorage.getItem("token"))
              : null,
        },
      })
      .then((res) => {
        toast.success(`Menu Deleted Successfully`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => window.location.replace("/admin/menu-items"), 1000);
      });
  };

  const handleSaveMenu = () => {
    const itemId = menu._id;
    console.log("Item id", itemId);
    axios
      .put(`/item/update-item/${itemId}`, editMenuData, {
        headers: {
          authorization:
            localStorage.getItem("token") !== null
              ? JSON.parse(localStorage.getItem("token"))
              : null,
        },
      })
      .then((res) => {
        setOpen(false);
        toast.success(`Menu Updated Successfully`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => window.location.replace("/admin/menu-items"), 1000);
      });
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
          {menu.itemName}
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
          // onClick={onMenuEditClick}
          onClick={handleClickOpen}
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
          onClick={handleDeleteMenu}
          className="boot-user-add-to-cart-button"
          class="btn text-center mt-4 boot-user-add-to-cart-button"
        >
          Delete Menu
        </a>
      </div>
      {/* =========================Boot Strap Edit Modal ==========================
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
      </div> */}
      {/* ===================================Testing DIalog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {/* <DialogTitle id="form-dialog-title">Adding Menu Item</DialogTitle> */}
        <DialogContent>
          <Container component="main" maxWidth="l">
            <CssBaseline />
            <div /*className={classes.paper}*/>
              <Typography
                component="h1"
                variant="h5"
                style={{ color: "black", marginBottom: "5%" }}
              >
                Edit Menu Item
              </Typography>
              <form /*className={classes.form}*/ noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="itemName"
                      variant="outlined"
                      required
                      fullWidth
                      id="itemName"
                      label="Dish Name"
                      autoFocus
                      onChange={handleChange}
                      value={editMenuData.itemName}
                      inputProps={{ maxLength: 20 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Price"
                      name="price"
                      onChange={handleChange}
                      value={editMenuData.price}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="category"
                      label="Category"
                      name="category"
                      onChange={handleChange}
                      value={editMenuData.category}
                    />
                  </Grid>

                  {/*<Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="category"
                      value={category}
                      label="Category"
                      onChange={handleChange}
                      fullWidth
                      style={{ color: "black" }}
                    >
                      <MenuItem value={"Fast Food"}>Fast Food</MenuItem>
                      <MenuItem value={"Chinese"}>Chinese</MenuItem>
                      <MenuItem value={"Italian"}>Italian</MenuItem>
                    </Select>
                  </Grid>
      */}

                  {/*<Grid item xs={12} sm={10}>
                        <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Category"
                    value={Category}
                    onChange={handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    helperText="Please select your Dish Category"
                    variant="outlined"
                    >
                        {gender.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
                   
                    </TextField>
              </Grid>*/}

                  <Grid item xs={12}>
                    <TextField
                      rows={2}
                      maxRows={1}
                      fullWidth
                      name="description"
                      id="outlined-textarea"
                      label="Description about Ingredients"
                      placeholder="Placeholder"
                      multiline
                      variant="outlined"
                      onChange={handleChange}
                      value={editMenuData.description}
                      inputProps={{ maxLength: 120 }}
                    />
                  </Grid>

                  {/* <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Show to User By Default"
                    />
                  </Grid> */}
                </Grid>
                {/* <Button variant="contained" component="label">
                  Upload Dish Picture
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    // onChange={imageHandler}
                  />
                </Button>

                <img
                  // src={dishPic}
                  alt=""
                  style={{ width: "100%", height: "250px" }}
                /> */}
              </form>
            </div>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveMenu} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
