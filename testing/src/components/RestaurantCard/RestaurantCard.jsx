import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
//import restaurants from "../../services/restaurants";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch } from "react-redux";
import { pushRestId } from "../../redux/actions/dataActions";
//  I did not use Redux Store for this component because there was no need for complexity.

const RestaurantCard = () => {
  let [restaurants, setRestaurants] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

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
    console.log("Use Effect called for fetching restaurants for users.");
    await axios
      .get("http://localhost:3001/user/get-restaurants")
      .then((res) => {
        if (res) {
          //console.log("Res", res.data.data);
          let dataFetched = res.data.data;
          setRestaurants(dataFetched);
        } else {
          console.log("Did not get any response");
          return null;
        }
      })
      .catch((error) => {
        if (error) {
          console.log("Error in catch", error);
        } else {
          console.log("Server Erorr");
        }
      });

    /*       .then((response) => {
        console.log(data);
        setD(response.data);
        if (!d) return (d = null);
 */ //console.log(d);
    //});
  }, []);

  const viewMenus = (restId) => {
    dispatch(pushRestId(restId));
    history.push("/view-menu-card");
  };

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
            <button
              className="btn"
              type="button"
              onClick={() => {
                viewMenus(item._id);
              }}
            >
              Open Me Up
            </button>
            {/* <button type="onClick" onClick={onClick(item._id)}></button>
            <Link
              to="/viewmenus"
              params={{ id: item._id }}
              className="btn btn-primary"
            >
              Click Me!
            </Link> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantCard;
