import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMenusForCustomer,
  addToReduxCart,
} from "../../redux/actions/dataActions";
import { useHistory } from "react-router";
import { Cart } from "../../components";
import axios from "axios";

const MenuCard = () => {
  const { restId, fetchedMenusForCustomer, cart } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  const history = useHistory();
  // let { items } = fetchedMenusForCustomer.data;
  //console.log("Res id of in Menu Card component", restId);

  console.log(
    "Fetched Mnus for Customer Array data.",
    fetchedMenusForCustomer.data
  );
  let menus = fetchedMenusForCustomer.data;

  const addToCart = (item) => {
    dispatch(addToReduxCart(item));
  };
  console.log("Cart Data", cart);

  useEffect(async () => {
    console.log("Use effect called for Menu Card component data fetching");
    await dispatch(fetchMenusForCustomer(restId));
  }, []);

  return (
    <div className="container">
      {menus &&
        menus.map((item, key) => (
          <div className="card" key={key} style={{ width: "400px" }}>
            <img src="images/pizza.jpg" alt="Pizza" style={{ width: "100%" }} />
            <div className="card-body">
              <h4 className="card-title">Item{item.name}</h4>
              <p className="card-text"> Des{item.description}</p>
              <span>{item.price}Price</span>
              <br></br>
              <span>{item.category}Category</span>
              <button type="button" onClick={() => addToCart(item)}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      <button type="button" onClick={() => history.push("/cart")}>
        {" "}
        Go to Cart
      </button>
    </div>
  );
};

export default MenuCard;
