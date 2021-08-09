import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import restaurants from "../../services/restaurants";
import "bootstrap/dist/css/bootstrap.css";

const RestaurantCard = () => {
  let [restaurants, setRestaurants] = useState([]);

  // const onClick = (restaurantId) => {
  //   useEffect(async (restaurantId) => {
  //     const { data } = await axios.get(
  //       `http://localhost:3001/user/get-restaurant/${restaurantId}`,
  //       {
  //         headers: {
  //           authorization:
  //             localStorage.getItem("token") !== null
  //               ? JSON.parse(localStorage.getItem("token"))
  //               : null,
  //         },
  //       }
  //     );
  //   }, []);
  // };

  useEffect(async () => {
    const { data } = await axios.get(
      "http://localhost:3001/user/get-restaurants"
    );
    if (data) {
      console.log("Data was  fetched", data.data);
      let finalDataToLaod = data.data;
      setRestaurants(finalDataToLaod);
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

  return (
    <div className="container">
      {restaurants.map((item, key) => (
        <div className="card" key={key} style={{ width: "400px" }}>
          <img src="images/kfc.jpg" alt="KFC" style={{ width: "100%" }} />
          <div className="card-body">
            <h4 className="card-title">Name: {item.restaurantName}</h4>
            <span>{item.contact}Phone</span>
            <br></br>
            <span>Address: {item.address}</span>
            <br></br>
            {/* <button type="onClick" onClick={onClick(item._id)}></button> */}
            <Link
              to="/viewmenus"
              params={{ id: item._id }}
              className="btn btn-primary"
            >
              Click Me!
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantCard;
