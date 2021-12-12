import axios from "axios";
import React, { Component, useEffect } from "react";

//=====================================Redux Imports=================================
import { useDispatch, useSelector } from "react-redux";

const UserTableReservation = () => {
  const [loading, setLoading] = React.useState(true);
  const { custData } = useSelector((state) => state.auth);

  //======================================= Use Effect ============================================

  useEffect(async () => {
    let customerId = custData._id;
    // console.log("customer Id", customerId);
    //window.alert(id);
    const { data } = await axios.get(
      `/user/get-my-reservations/${custData._id}`,
      {
        headers: {
          authorization:
            localStorage.getItem("token") !== null
              ? JSON.parse(localStorage.getItem("token"))
              : null,
        },
      }
    );
    console.log("Whole response Data", data);
    if (data) {
      //console.log("Data Fetched", data.data.items);
      console.log("Reservation Data", data.reservations);
      //   let finalLoadedData = data.data.items;
      //let restaurantId=data.data._id;

      // setRestaurantId(data.data._id);
      // setRestaurantName(data.data.restaurantName);
      // setContact(data.data.contact);
      setLoading(true);
    } else {
      console.log("Could not fetch data.");
    }
  }, []);
  return <div></div>;
};

export default UserTableReservation;
