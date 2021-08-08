import { SingleBed } from "@material-ui/icons";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";

import TitleTag from "../SpecialComp/TitleTag";
import SingleRestaurant from "./SingleRestaurant";
import "./Restaurants.css";

const Restaurants = () => {
    let [d, setD] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/user/get-restaurants").then((response) => {
      console.log(response.data);
      setD(response.data);
      if (!d) return (d = null);
      //console.log(d);
    });
  }, []);
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
