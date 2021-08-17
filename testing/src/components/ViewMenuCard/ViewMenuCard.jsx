import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
const ViewMenuCard = () => {
  let [d, setD] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/menu").then((response) => {
      //console.log(response.data);
      setD(response.data);
      if (!d) return (d = null);
      console.log(d);
    });
  }, []);

  return (
    <div className="container">
      {d.map((item, key) => (
        <div className="card" key={key} style={{ width: "400px" }}>
          <img src="images/kfc.jpg" alt="KFC" style={{ width: "100%" }} />
          <div className="card-body">
            <h4 className="card-title">Name: {item.itemName}</h4>
            <p className="card-text"> Category: {item.category}</p>
            <span>{item.price}Price</span>
            <br></br>
            <span>Description: {item.description}</span>
            <br></br>
            <Link to="#" className="btn btn-primary">
              Add to cart!
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewMenuCard;