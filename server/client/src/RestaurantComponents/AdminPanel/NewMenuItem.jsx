import React, { Component } from "react";
import axios from "../../axios";

//========================Material ui Imports ============================
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@mui/material/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },
// }));

const NewMenuItem = ({
  handleChange,
  handleSubmit,
  itemName,
  price,
  category,
  description,
  status,
}) => {
  const [dishPic, setDishPic] = React.useState();

  const imageHandler = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDishPic(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setDishPic(e);
    console.log("image", dishPic);
    await axios
      .post("/item/image", {
        dishPic,
      })
      .then((response) => {
        window.alert("successful");
        console.log("Response image upload", response);
      })
      .catch((err) => {
        console.log("image upload error", err);
      });
  };

  ////////////////////////Image Upload Test
  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("itemImage", dishPic);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    await axios
      .post("/item/image", formData, config)
      .then((response) => {
        window.alert("successful");
        console.log("Response image upload", response);
      })
      .catch((err) => {
        console.log("image upload error", err);
      });
  };

  const handleImageChange = (e) => {
    setDishPic(e.target.files[0]);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const classes = useStyles();

  /*const [categories, setCategory] = React.useState('M');


  const category = [
    {
      value: 'Chinese',
      label: 'Chinese',
    },
    {
      value: 'Italian',
      label: 'Italian',
    },
   
  ];*/

  /*const handleChange = (event) => {
    setGender(event.target.value);
  };*/

  return (
    <div>
      {/* <Button
        style={{
          marginTop: "3%",
          width: "100%",
          marginBottom: "3%",
          height: "60px",
        }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Add New Menu
      </Button> */}
      <a
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
        Add New Menu Menu
      </a>
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
                New Menu Item
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
                      value={itemName}
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
                      value={price}
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
                      value={category}
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
                      value={description}
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
                <Button variant="contained" component="label">
                  Upload Dish Picture
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={imageHandler}
                  />
                </Button>
                <img
                  src={dishPic}
                  alt=""
                  style={{ width: "100%", height: "250px" }}
                />
                <input
                  type="file"
                  id="myFile"
                  name="itemImage"
                  onChange={handleImageChange}
                />
                <input onClick={handleImageUpload}></input>
              </form>
            </div>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default NewMenuItem;
