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
    } else {
      console.log("Could not fetch data.");
    }
  }, []);
  console.log("This ID", ID);

  return (
    <div className="Restaurants">
      <TitleTag title="Menu Management" />
      <div className="restaurants_grid">
        {items.length > 0 ? (
          items.map((item, index) => <SingleMenu key={index} menu={item} />)
        ) : (
          <Alert
            severity="info"
            style={{
              justifyContent: "center",
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            <AlertTitle>
              {" "}
              <h2> Currently There are no Menu Items. Please Add Some.</h2>
            </AlertTitle>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default MenuItems;
