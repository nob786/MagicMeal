import { SingleBed } from "@material-ui/icons";
import React, { useState, useEffect, Component } from "react";

import TitleTag from "../SpecialComp/TitleTag";
import SingleUserMenu from "./SingleUserMenu";
import axios from "../../axios";
import "./UserMenuItems.css";

//=====================================Redux Imports=================================
import { useDispatch, useSelector } from "react-redux";




//======================================MAterial UI Imports =======================
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const UserMenuItems = () => {

  const [items, setItems] = React.useState([]);
  const [restaurantId, setRestaurantId] = React.useState();
  const [restaurantName, setRestaurantName] = React.useState();
  const [contact, setContact] = React.useState();

  
  
  const {clickedRestaurantId} = useSelector(
    (state) => state.data
  );
  const {clickedRestaurantData} = useSelector(
    (state) => state.data
  );

  const restId= clickedRestaurantId;

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
      console.log("Restaurant",data.data);
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
    <div className="Menus">
      <div className="menu-restaurant-profile">
        <span className="user-menu-restaurant-name">{clickedRestaurantData.restaurantName} </span>
        <br />
        <br />
        <br />
        <span className="user-menu-restaurant-address"><LocationOnIcon/>  {clickedRestaurantData.address} </span>
        <br />
        <span className="user-menu-restaurant-contact"><PhoneInTalkIcon/>  {clickedRestaurantData.contact} </span>
        <br />
        <span className="user-menu-restaurant-category">Restaurant Type: {clickedRestaurantData.category} </span>
        <br />
      </div>

      <TitleTag title="Menu Items We Have" />
      {clickedRestaurantData.items.length === 0 ? 
      <span className="restaurant-item-check">
        <Alert severity="info">
        <AlertTitle> <h2> Currently This Restaurant has not added any Item. Please come back later or Contact the Restaurant for any Querry.</h2></AlertTitle>
      </Alert>
       
      </span> :
      null}
      <div className="user-menus-grid">
        {items.map((item, index) => (
          <SingleUserMenu key={index} menu={item} restId={restaurantId} restName={restaurantName} cont={contact} />
        ))}
      </div>
    </div>
  );
};

export default UserMenuItems;
