import { SingleBed } from "@material-ui/icons";
import React, { useEffect, useState, Component } from "react";
import axios from "../../axios";
import TitleTag from "../SpecialComp/TitleTag";
import SingleRestaurant from "./SingleRestaurant";
import "./Restaurants.css";

const Restaurants = () => {
  let [d, setD] = useState([]);
  let data;

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
  return (
    <div className="Restaurants">
      <TitleTag title="Restaurants Near-By" />
      <div className="restaurants_grid">
        {d.map((item, key) => (
          <SingleRestaurant key={key} restaurant={item} />
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
