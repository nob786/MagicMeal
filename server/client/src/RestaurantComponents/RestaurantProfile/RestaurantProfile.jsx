import React, { Component } from "react";
import { useHistory } from "react-router-dom";

//Import Css File
import "./RestaurantProfile.css";

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

//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantData } from "../../Redux/actions/authentication";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const RestaurantProfile = () => {
  //Customer Data
  const { restData } = useSelector((state) => state.auth);
  const [imageUrl, setImageUrl] = React.useState(
    restData.imageUrl ? restData.imageUrl : ""
  );
  const history = useHistory();
  const dispatch = useDispatch();

  // console.log(restData);
  React.useEffect(() => {}, []);
  const handleUploadPicture = async () => {
    await axios
      .post(
        `/item/profile-image`,
        { imageUrl },
        {
          headers: {
            authorization:
              localStorage.getItem("token") !== null
                ? JSON.parse(localStorage.getItem("token"))
                : null,
          },
        }
      )
      .then((res) => {
        dispatch(updateRestaurantData());
        console.log("Restaurant Image Uploaded");
        toast.success(`Restaurant Image Uploaded`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(`Restaurant Image Error`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };
  const imageHandler = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setImageUrl(e);
    console.log("image uploaded", imageUrl);
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
                        {imageUrl === "" ? (
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
                            src={imageUrl}
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
                      {imageUrl ? (
                        <button
                          onClick={handleUploadPicture}
                          type="button"
                          class="btn-lg btn-block"
                        >
                          Upload Profile Pic
                        </button>
                      ) : null}
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
                            {restData.tempEmail}
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
