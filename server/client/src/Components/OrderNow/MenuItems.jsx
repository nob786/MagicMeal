import { SingleBed } from "@material-ui/icons";
import React, { useState, useEffect, Component } from "react";

import TitleTag from "../SpecialComp/TitleTag";
import SingleRestaurant from "./SingleRestaurant";
import SingleMenu from "./SingleMenu";
import axios from "../../axios";
import "./MenuItems.css";
import NewMenuItem from "../../RestaurantComponents/AdminPanel/NewMenuItem";


const MenuItems = (ID) => {
  // const[restaurant,setRestaurant] = React.useState([
  //     { imageLoc: "./Pictures/R9.jpg", menuTitle: "Rice" , menuDesc: "Canal Bank Road Multan" ,},
  //     { imageLoc: "./Pictures/R8.jpg", menuTitle: "Macroni" , menuDesc: "Canal Bank Road Multan"},
  //     { imageLoc: "./Pictures/R3.jpg", menuTitle: "Biryani" , menuDesc: "Canal Bank Road Multan"},
  //     { imageLoc: "./Pictures/R4.jpg", menuTitle: "Burger" , menuDesc: "Canal Bank Road Multan"},
  //     { imageLoc: "./Pictures/R5.jpg", menuTitle: "Pancake" , menuDesc: "Canal Bank Road Multan"},
  //     { imageLoc: "./Pictures/R6.jpg", menuTitle: "Salad" , menuDesc: "Canal Bank Road Multan"},
  //     { imageLoc: "./Pictures/R7.jpg", menuTitle: "Mango Milk Shake" , menuDesc: "Canal Bank Road Multan"},
  //     { imageLoc: "./Pictures/R8.jpg", menuTitle: "Grill Burger" , menuDesc: "Canal Bank Road Multan"},
  //     { imageLoc: "./Pictures/R9.jpg", menuTitle: "Club Sandwitch" , menuDesc: "Canal Bank Road Multan"},
  // ]);

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
      <TitleTag title="Menu Items Available" />
      <div className="restaurants_grid">
        {items.map((item, index) => (
          <SingleMenu key={index} menu={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
