import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMenus } from "../../redux/actions/dataActions";
const ViewMenuCard = ({ restId }) => {
  // I am not able to set my state by getting data from redux. It give error that is (Too many renders) find its reason.
  // let [menuData, setMenuData] = useState([]);
  // let [menuDataa, setMenuDataa] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Use Effect called");
    dispatch(getMenus());
  }, []);

  const { data } = useSelector((state) => state.data.fetchedMenus);
  console.log("Data fetched from selector", data);

  //setMenuData([...menuData, data]);

  // console.log("This is after seting state", menuData);

  return (
    <div className="container">
      {data.map((item, key) => (
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
