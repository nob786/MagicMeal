import { SingleBed } from "@material-ui/icons";
import React, { useState, useEffect, Component } from "react";

import TitleTag from "../SpecialComp/TitleTag";
import SingleUserMenu from "./SingleUserMenu";
import axios from "../../axios";
import "./UserMenuItems.css";

import { useDispatch, useSelector } from "react-redux";

const UserMenuItems = () => {
  const [items, setItems] = React.useState([]);
  const [restaurantId, setRestaurantId] = React.useState();
  const [restaurantName, setRestaurantName] = React.useState();
  const [contact, setContact] = React.useState();

  const { clickedRestaurantId } = useSelector((state) => state.data);
  const restId = clickedRestaurantId;

  useEffect(async () => {
    const { data } = await axios.get(`/user/get-restaurant-menu/${restId}`, {
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
    } else {
      console.log("Could not fetch data.");
    }
  }, []);
  console.log("This ID", items);

  return (
    <div className="Restaurants">
      <TitleTag title="Menu Items Availablesss" />
      <div className="menus_grid">
        {items.map((item, index) => (
          <SingleUserMenu
            key={index}
            menu={item}
            restId={restaurantId}
            restName={restaurantName}
            cont={contact}
          />
        ))}
      </div>
    </div>
  );
};

export default UserMenuItems;
