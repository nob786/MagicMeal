import { SingleBed } from "@material-ui/icons";
import React, { useState, useEffect, Component } from "react";

import TitleTag from "../SpecialComp/TitleTag";
import SingleRestaurant from "./SingleRestaurant";
import SingleMenu from "./SingleMenu";
import axios from "../../axios";
import "./MenuItems.css";
import NewMenuItem from "../../RestaurantComponents/AdminPanel/NewMenuItem";

//============================Material Ui Imports================
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const MenuItems = (ID) => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  useEffect(async () => {
    const { data } = await axios.get("/item/get-items", {
      headers: {
        authorization:
          localStorage.getItem("token") !== null
            ? JSON.parse(localStorage.getItem("token"))
            : null,
      },
    });
    console.log("Whole response Data", data);
    if (data) {
      console.log("Data Fetched", data.data);
      let finalLoadedData = data.data;
      setItems(finalLoadedData);
      setLoading(false);
    } else {
      console.log("Could not fetch data.");
    }
  }, []);
  console.log("This ID", ID);

  return loading === true ? (
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
    <div className="Restaurants">
      <TitleTag title="Menu Management-B" />
      <div className="restaurants_grid">
        {items.length > 0 ? (
          items.map((item, index) => <SingleMenu key={index} menu={item} />)
        ) : (
          <div class="alert alert-primary m-5" role="alert">
            No Menus Found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItems;
