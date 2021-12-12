import axios from "axios";
import React, { Component, useEffect } from "react";

//=====================================Redux Imports=================================
import { useDispatch, useSelector } from "react-redux";

const RestaurantTableReservation = () => {
  const [loading, setLoading] = React.useState(true);
  const { restData } = useSelector((state) => state.auth);

  const updateReservationStatus = async () => {
    // const restId = restData._id;
    let reservationStatus = "free";
    await axios
      .put(
        `/item//update-reservation-status`,
        {
          reservationStatus: reservationStatus,
          reservationId: "61b3d884a2715a2eb4daa7bb",
          customerId: "61a723529f51af53b08debd0",
          tableNumber: "12",
        },
        {
          headers: {
            authorization:
              localStorage.getItem("token") !== null
                ? JSON.parse(localStorage.getItem("token"))
                : null,
          },
        }
      )
      .then((response) => {
        console.log("Update Reservation Status", response);
        //window.alert("Order Successfully Approved");
        // toast.success(`Order Approved`, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        // setTimeout(() => window.location.replace("/admin/orders"), 1000);
      });
  };

  //======================================= Use Effect ============================================

  useEffect(async () => {
    // let restaurantId = restData._id;
    // console.log("customer Id", customerId);
    //window.alert(id);
    const { data } = await axios.get(
      `/item/get-reserved-tables/${restData._id}`,
      {
        headers: {
          authorization:
            localStorage.getItem("token") !== null
              ? JSON.parse(localStorage.getItem("token"))
              : null,
        },
      }
    );
    // console.log("Whole response Data", data);
    if (data) {
      //console.log("Data Fetched", data.data.items);
      console.log("Restaurant Side Reservation Data", data.reservations);
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
  return (
    <div>
      <button onClick={updateReservationStatus}>
        Update Reservation Status
      </button>
    </div>
  );
};

export default RestaurantTableReservation;
