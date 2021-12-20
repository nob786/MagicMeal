import React, { Component } from "react";

import "./SingleRestaurant.css";

import { Link, useHistory } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

//==========================Redux imports===================================
import { useDispatch, useSelector } from "react-redux";
import { pushRestaurantId } from "../../Redux/actions/dataActions";
import { pushClickedRestaurantData } from "../../Redux/actions/dataActions";

const SingleRestaurant = ({ restaurant }) => {
  const [value, setValue] = React.useState();

  const history = useHistory();
  const dispatch = useDispatch();

  const onRestaurantClick = () => {
    dispatch(pushRestaurantId(restaurant._id));
    dispatch(pushClickedRestaurantData(restaurant));
    /*window.alert(restaurant._id);*/
    //history.push("/user-menu-items");
    history.push(`/user-menu-items/${restaurant._id}`);
  };
  return (
    <div
      style={{
        borderRadius: "25px",
        boxShadow:
          "5px 5px 10px 5px rgba(0, 0, 0, 0.2),0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
      onClick={onRestaurantClick}
      className="Single_Restaurant"
      class="card Single_Restaurant"
    >
      <img
        style={{
          backgroundImage: restaurant.imageUrl
            ? `url(${restaurant.imageUrl})`
            : "url(https://images.pexels.com/photos/9535774/pexels-photo-9535774.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)",
          height: "250px",
          borderRadius: "25px",
        }}
        // class="card-img-top"
      />
      <div class="card-body text-center">
        <h5 class="card-title text-center restaurant-name-container">
          {restaurant.restaurantName}
        </h5>
        <p class="card-text">{restaurant.address.toUpperCase()}</p>
      </div>
      {/* <ul class="list-group list-group-flush">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul> */}
      <div class="card-body text-center">
        Rating: 4.2
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating
            name="half-rating-read"
            defaultValue={4.2}
            precision={0.1}
            readOnly
          />
        </Box>
      </div>
    </div>
    //   <div
    //     className="Single-Restaurant"
    //     onClick={onRestaurantClick}
    //     style={{ textDecoration: "none" }}
    //   >
    //     <div className="Single_Restaurant">
    //       <div
    //         style={{
    //           backgroundImage:
    //             "url(https://images.pexels.com/photos/9535774/pexels-photo-9535774.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)",
    //           height: "250px",
    //           borderRadius: "25px",
    //         }}
    //         className="restaurant-image-container"
    //       >
    //         {/* <img
    //           className="restaurant_image"
    //           src={
    //             "https://images.pexels.com/photos/9535774/pexels-photo-9535774.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    //           }
    //         /> */}
    //       </div>
    //       {/*} <div>
    //       <FavoriteBorderIcon
    //         style={{ fontSize: 40, color: "red", float: "left" }}
    //       />
    // </div>*/}
    //       <div>
    //         <h1 className="restaurant-title">{restaurant.restaurantName}</h1>
    //       </div>
    //       <div className="restaurant-address">{restaurant.address}</div>

    //       <div className="rating">
    //         <br />
    //         Rating: 4.2
    //         <Box component="fieldset" mb={3} borderColor="transparent">
    //           <Rating
    //             name="half-rating-read"
    //             defaultValue={4.2}
    //             precision={0.1}
    //             readOnly
    //           />
    //         </Box>
    //       </div>
    //     </div>
    //   </div>
  );
};

export default SingleRestaurant;
