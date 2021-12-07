import React, { Component } from "react";
import { useHistory } from "react-router-dom";

//=====================Material Ui Imports=========================
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "../../axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

// Redux Imports
import { useSelector } from "react-redux";

//Import Css File
import "./RestaurantProfile.css";

const RestaurantProfile = () => {
  const [location, setLocation] = React.useState({
    loaded: false,
    coordinates: { lat: "", long: "" },
  });
  const history = useHistory();

  const handleClickGps = () => {
    navigator.geolocation.getCurrentPosition((location) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          long: location.coords.longitude,
        },
      });
    });
    console.log("loc", location);
  };

  const handleUploadLocation = () => {
    if (location.loaded === true) {
      history.push("/admin/");
    } else if (location.loaded === false) {
    }
  };

  //Customer Data
  const { restData } = useSelector((state) => state.auth);
  // console.log(restData);

  return (
    <div className="user-profile">
      <div class=" ">
        <div class="padding">
          <div class=" justify-content-center">
            <div class="">
              <div class="card ">
                <div class="row">
                  <div class="col-sm-4 bg-c-lite-green ">
                    <div class=" text-center text-white">
                      <div class="">
                        {" "}
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          class="img-radius"
                          alt="User-Profile-Image"
                        />{" "}
                      </div>
                      <h6 class="">{restData.ownerName}</h6>
                      <p>Restaurant Profile</p> <i class="  "></i>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div class="card-block">
                      <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                        Information
                      </h6>
                      <div class="">
                        <div class="">
                          <p class="m-b-10 f-w-600 user-profile-p">
                            Owner Name
                          </p>
                          <h6 class="text-muted f-w-400 user-profile-h6">
                            {restData.ownerName}
                          </h6>
                        </div>

                        <div class="">
                          <p class="m-b-10 f-w-600 user-profile-p">
                            Restaurant Name
                          </p>
                          <h6 class="text-muted f-w-400 user-profile-h6">
                            {restData.restaurantName}
                          </h6>
                        </div>
                      </div>
                      <div class="">
                        <div class="">
                          <p class="m-b-10 f-w-600 user-profile-p">Email</p>
                          <h6 class="text-muted f-w-400 user-profile-h6">
                            {restData.email}shameermasood@gmail.com
                          </h6>
                        </div>

                        <div class="">
                          <p class="m-b-10 f-w-600user-profile-p">Phone</p>
                          <h6 class="text-muted f-w-400 user-profile-h6">
                            {restData.contact}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-page-location-container">
        <FormControl
          color="warning"
          className="main-page-location-bar"
          sx={{ m: 1, maxWidth: "600px" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Select Location
          </InputLabel>
          <OutlinedInput
            id="outlined"
            endAdornment={
              <InputAdornment position="end">
                <GpsFixedIcon
                  onClick={handleClickGps}
                  sx={{
                    color: "#fe724c",
                    cursor: "grab",
                  }}
                />
              </InputAdornment>
            }
            label="Enter Full Address"
            value={`${location.coordinates.lat} ${location.coordinates.long}`}
          />
        </FormControl>
        <button
          className="main-page-delivery-button"
          onClick={handleUploadLocation}
        >
          Upload Location
        </button>
      </div>
    </div>
  );
};

export default RestaurantProfile;
