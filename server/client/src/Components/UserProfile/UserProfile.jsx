import React, { Component } from "react";

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
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";

// Redux Imports
import { useSelector } from "react-redux";

//Import Css File
import "./UserProfile.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const history = useHistory();

  //Customer Data
  const { custData } = useSelector((state) => state.auth);
  console.log(custData);

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
                      <h6 class="">
                        {custData.firstName + " " + custData.lastName}
                      </h6>
                      <p>Customer Profile</p> <i class="  "></i>
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
                            First Name
                          </p>
                          <h6 class="text-muted f-w-400 user-profile-h6">
                            {custData.firstName}
                          </h6>
                        </div>

                        <div class="">
                          <p class="m-b-10 f-w-600 user-profile-p">Last Name</p>
                          <h6 class="text-muted f-w-400 user-profile-h6">
                            {custData.lastName}
                          </h6>
                        </div>
                      </div>
                      <div class="">
                        <div class="">
                          <p class="m-b-10 f-w-600 user-profile-p">Email</p>
                          <h6 class="text-muted f-w-400 user-profile-h6">
                            {custData.tempEmail}
                          </h6>
                        </div>

                        <div class="">
                          <p class="m-b-10 f-w-600user-profile-p">Phone</p>
                          <h6 class="text-muted f-w-400 user-profile-h6">
                            {custData.contact}
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

export default UserProfile;
