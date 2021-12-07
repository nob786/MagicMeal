import { SingleBed } from "@material-ui/icons";
import React, { useState, useEffect, Component } from "react";
import { useParams } from "react-router";

import TitleTag from "../SpecialComp/TitleTag";
import SingleUserMenu from "./SingleUserMenu";
import axios from "../../axios";
import "./UserMenuItems.css";

//=====================================Redux Imports=================================
import { useDispatch, useSelector } from "react-redux";

//======================================MAterial UI Imports =======================
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const UserMenuItems = () => {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [restaurantId, setRestaurantId] = React.useState();
  const [restaurantName, setRestaurantName] = React.useState();
  const [contact, setContact] = React.useState();
  const { id } = useParams();

  const { clickedRestaurantId } = useSelector((state) => state.data);
  const { clickedRestaurantData } = useSelector((state) => state.data);

  //const restId = clickedRestaurantId;

  useEffect(async () => {
    //window.alert(id);
    const { data } = await axios.get(`/user/get-restaurant-menu/${id}`, {
      /*headers: {
        authorization:
          localStorage.getItem("token") !== null
            ? JSON.parse(localStorage.getItem("token"))
            : null,
      },*/
    });
    console.log("Whole response Data", data);
    if (data) {
      //console.log("Data Fetched", data.data.items);
      console.log("Restaurant", data.data);
      let finalLoadedData = data.data.items;
      //let restaurantId=data.data._id;
      setItems(finalLoadedData);
      setRestaurantId(data.data._id);
      setRestaurantName(data.data.restaurantName);
      setContact(data.data.contact);
      setLoading(true);
    } else {
      console.log("Could not fetch data.");
    }
  }, []);
  console.log("This ID", items);

  return loading === false ? (
    <div class="d-flex justify-content-center">
      <div
        class="spinner-border m-5"
        role="status"
        style={{ color: "#fe724c" }}
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="Menus">
      <div className="menu-restaurant-profile">
        <span className="user-menu-restaurant-name">
          {clickedRestaurantData.restaurantName}{" "}
        </span>
        <br />
        <br />
        <br />
        <span className="user-menu-restaurant-address">
          <LocationOnIcon /> {clickedRestaurantData.address}{" "}
        </span>
        <br />
        <span className="user-menu-restaurant-contact">
          <PhoneInTalkIcon /> {clickedRestaurantData.contact}{" "}
        </span>
        <br />
        <span className="user-menu-restaurant-category">
          Type: {clickedRestaurantData.category}{" "}
        </span>
        <br />
      </div>

      <TitleTag title="Menu Items We Have" />
      {clickedRestaurantData.items.length === 0 ? (
        <div class="alert alert-secondary text-center" role="alert">
          No Menu Found.{" "}
          <a href="/restaurants" class="alert-link">
            Click here to Browse Other Restaurants
          </a>
        </div>
      ) : null}
      <div className="user-menus-grid">
        {items.map((item, index) => (
          <SingleUserMenu
            key={index}
            menu={item}
            restId={restaurantId}
            restName={restaurantName}
            cont={contact}
            quantity={1}
          />
        ))}
      </div>
    </div>
  );
};

export default UserMenuItems;
