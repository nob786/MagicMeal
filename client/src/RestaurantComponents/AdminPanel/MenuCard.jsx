import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "./MenuCard.css";

const MenuCard = () => {
  let [d, setD] = useState([]);

  useEffect(() => {
    axios.get("/api/menu").then((response) => {
      //console.log(response.data);
      setD(response.data);
      if (!d) return (d = null);
      //console.log(d);
    });
  }, []);

  return (
    <div className="container">
      {d.map((item, key) => (
        <div className="card" key={key} style={{ width: "400px" }}>
          <img
            src="../Pictures/food.jpg"
            alt="Pizza"
            style={{ width: "100%" }}
          />
          <div className="card-body">
            <h4 className="card-title">Item: {item.itemName}</h4>
            <p className="card-text"> Des: {item.description}</p>
            <span>Price: {item.price}</span>
            <br></br>
            <span>Category: {item.category}</span>
            <button type="button">Delete Me</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuCard;
