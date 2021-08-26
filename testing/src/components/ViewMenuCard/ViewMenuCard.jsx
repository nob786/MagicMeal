import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMenus, delMenu, updateMenu } from "../../redux/actions/dataActions";
import { useHistory } from "react-router";
import AddMenuForm from "../AddMenuForm/AddMenuForm";
const ViewMenuCard = ({ restId }) => {
  // I am not able to set my state by getting data from redux. It give error that is (Too many renders) find its reason.
  let [menuData, setMenuData] = useState([]);
  // let [menuDataa, setMenuDataa] = useState([]);
  //console.log("yo", null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(async () => {
    console.log("Use Effect called");
    await dispatch(getMenus());
  }, [dispatch]);

  const { data } = useSelector((state) => state.data.fetchedMenus);
  console.log("Data fetched from selector", data);

  //setMenuData([...menuData, data]);

  // console.log("This is after seting state", menuData);
  const handleDelete = async (itemId) => {
    await dispatch(delMenu(itemId));
  };

  const handleUpdate = async (menuId, history) => {
    await dispatch(updateMenu(menuId, history));
  };
  return (
    <div className="container">
      {data &&
        data.map((item, key) => (
          <div className="card" key={key} style={{ width: "400px" }}>
            <img src="images/kfc.jpg" alt="KFC" style={{ width: "100%" }} />
            <div className="card-body">
              <h4 className="card-title">Name: {item.itemName}</h4>
              <p className="card-text"> Category: {item.category}</p>
              <span>{item.price}Price</span>
              <br></br>
              <span>Description: {item.description}</span>
              <br></br>
              <button type="submit" onClick={() => handleDelete(item._id)}>
                Delete Item!
              </button>
              <button type="submit" onClick={() => handleUpdate(item._id)}>
                Update Item
              </button>
            </div>
          </div>
        ))}
      <div className="container">
        <AddMenuForm />
      </div>
    </div>
  );
};

export default ViewMenuCard;
