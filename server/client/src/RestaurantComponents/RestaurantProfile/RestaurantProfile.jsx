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
  const [profilePic, setProfilePic] = React.useState("");
  const history = useHistory();
  //Customer Data
  const { restData } = useSelector((state) => state.auth);
  // console.log(restData);

  const handleUploadPicture = async () => {
    let lat = "30.210098";
    let lng = "71.514337";
    await axios
      .post(`/item/upload-location/${lat}/${lng}`, {
        headers: {
          authorization:
            localStorage.getItem("token") !== null
              ? JSON.parse(localStorage.getItem("token"))
              : null,
        },
      })
      .then((res) => {
        console.log("Successful");
      })
      .catch(() => {
        console.log("Un-Successful");
      });
  };
  const imageHandler = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePic(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setProfilePic(e);
    console.log("image uploaded", profilePic);
    // await axios
    //   .post("/item/image", {
    //     dishPic,
    //   })
    //   .then((response) => {
    //     window.alert("successful");
    //     console.log("Response image upload", response);
    //   })
    //   .catch((err) => {
    //     console.log("image upload error", err);
    //   });
  };

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
                        {profilePic === "" ? (
                          <img
                            style={{
                              width: "90%",
                              height: "100%",
                              marginTop: "10px",
                            }}
                            src="https://img.icons8.com/bubbles/100/000000/user.png"
                            class="img-radius"
                            alt="User-Profile-Image"
                          />
                        ) : (
                          <img
                            src={profilePic}
                            alt="d"
                            style={{
                              width: "90%",
                              maxHeight: "400px",
                              marginTop: "10px",
                            }}
                          />
                        )}
                      </div>
                      <h6 style={{ fontSize: "22px" }} class="">
                        {restData.restaurantName}
                      </h6>
                      {/* <button
                        className="boot-button"
                        variant="contained"
                        component="label"
                        style={{ marginBottom: "10px" }}
                        type="file"
                        class="form-control"
                        id="customFile"
                      >
                        Upload Profile Picture
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={imageHandler}
                        />
                      </button> */}
                      <input
                        style={{ marginBottom: "10px" }}
                        onChange={imageHandler}
                        type="file"
                        accept="image/*"
                        class="form-control"
                        id="customFile"
                      />
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
    </div>
  );
};

export default RestaurantProfile;
