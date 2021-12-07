import { SingleBed } from "@material-ui/icons";
import React, { useEffect, useState, Component } from "react";
import axios from "../../axios";
import { useParams } from "react-router";

//=========================MAterial Ui Imports=======================
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import InputAdornment from "@mui/material/InputAdornment";
//==========================Components and Css Import===============
import TitleTag from "../SpecialComp/TitleTag";
import SingleRestaurant from "./SingleRestaurant";
import "./Restaurants.css";
import { useHistory } from "react-router";

const Restaurants = () => {
  const [location, setLocation] = React.useState({
    loaded: false,
    coordinates: { lat: "", long: "" },
  });
  let [d, setD] = useState([]);
  let [nearbyRestaurants, setNearbyRestaurants] = useState();
  const history = useHistory();
  // const { lat } = useParams();

  // const { long } = useParams();

  //===============Handle CLick Gps
  const handleClickGps = () => {
    navigator.geolocation.getCurrentPosition((location) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          long: location.coords.longitude,
        },
      });
    });
    console.log("loc", location);
  };

  // Use Effect
  useEffect(async () => {
    const { data } = await axios.get("/user/get-restaurants");
    if (data) {
      console.log("Data was  fetched", data.data);
      let finalDataToLaod = data.data;
      setD(finalDataToLaod);
    } else {
      console.log("Could not fetch data");
      return null;
    }

    /*       .then((response) => {
        console.log(data);
        setD(response.data);
        if (!d) return (d = null);
 */ //console.log(d);
    //});
  }, []);
  console.log("This is data of your state", d);
  const handleFindRestaurants = () => {
    if (location.loaded === true) {
      // history.push(
      //   `/restaurants/delivery/${location.coordinates.lat}&${location.coordinates.long}`
      // );
      const { nearbyData } = axios.get(
        `/restaurants-location/${location.coordinates.lat}/${location.coordinates.long}`
      );
      if (nearbyData) {
        setNearbyRestaurants(nearbyData);
        console.log("Got It", nearbyData);
      } else {
      }
    } else if (location.loaded === false) {
      console.log("Not Get It");
    }
    // window.alert(lat);
  };
  // Main Return Function
  return (
    <div className="Restaurants">
      <div className="restaurant-page-location">
        <h1>GET NEARBY RESTAURANTS</h1>
        <div className="restaurant-location-container">
          <FormControl
            color="warning"
            className="restaurant-page-location-bar"
            sx={{ m: "10px" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Location
            </InputLabel>
            <OutlinedInput
              id="outlined"
              endAdornment={
                <InputAdornment position="end">
                  <GpsFixedIcon
                    onClick={handleClickGps}
                    sx={{
                      color: "#fe724c",
                      cursor: "grab",
                    }}
                  />
                </InputAdornment>
              }
              label="Location"
              value={`${location.coordinates.lat} ${location.coordinates.long}`}
            />
          </FormControl>
          <button
            onClick={handleFindRestaurants}
            className="restaurant-page-button"
          >
            Find Restaurants
          </button>
        </div>
      </div>
      <TitleTag title="Nearby Restaurants" />
      <br />
      <div className="restaurants_grid">
        {d.map((item, key) => (
          <SingleRestaurant key={key} restaurant={item} />
        ))}
      </div>
      <TitleTag title="All Restaurants" />
      <br />
      <div className="restaurants_grid">
        {d.map((item, key) => (
          <SingleRestaurant key={key} restaurant={item} />
        ))}
      </div>
      <br />
    </div>
  );
};

export default Restaurants;
