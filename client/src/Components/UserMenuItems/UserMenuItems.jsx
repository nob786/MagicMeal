import { SingleBed } from "@material-ui/icons";
import React, { useState, useEffect, Component } from "react";

import TitleTag from "../SpecialComp/TitleTag";
import SingleUserMenu from "./SingleUserMenu";
import axios from "axios";
import "./UserMenuItems.css";


import { useDispatch, useSelector } from "react-redux";

const UserMenuItems = () => {
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

  
  
  const {clickedRestaurantId} = useSelector(
    (state) => state.data
  );
  const restId= clickedRestaurantId;

  useEffect(async () => {
    const { data } = await axios.get(`http://localhost:3001/user/get-restaurant-menu/${restId}`, {
      /*headers: {
        authorization:
          localStorage.getItem("token") !== null
            ? JSON.parse(localStorage.getItem("token"))
            : null,
      },*/
    });
    console.log("Whole response Data", data);
    if (data) {
      console.log("Data Fetched", data.data.items);
      let finalLoadedData = data.data.items;
      setItems(finalLoadedData);
    } else {
      console.log("Could not fetch data.");
    }
  }, []);
  console.log("This ID", items);

  return (
    <div className="Restaurants">
      <TitleTag title="Menu Items Available" />
      <div className="menus_grid">
        {items.map((item, index) => (
          <SingleUserMenu key={index} menu={item} />
        ))}
      </div>
    </div>
  );
};

export default UserMenuItems;
