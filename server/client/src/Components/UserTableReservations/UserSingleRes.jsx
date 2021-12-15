import React, { Component } from "react";
import axios from "axios";
//==========================Redux imports===================================

import { useDispatch, useSelector } from "react-redux";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const UserSingleTableReservation = ({ reservations }) => {
  // const warning = () => {
  //   if (reservations.reservationStatus === "pending") {
  //     return "#ffc529";
  //   } else if (reservations.reservationStatus === "reserved") {
  //     return "#339900";
  //   } else if (reservations.reservationStatus === "free") {
  //     return "#ffc529";
  //   } else if (reservations.reservationStatus === "cancelled") {
  //     return "#cc3300";
  //   }
  // };
  return (
    <div style={{ marginTop: "50px" }}>
      {/* <button on onClick={updateReservationStatus}>
        djdhjsd
      </button> */}
      <div class="card text-center w-50 m-auto">
        <div class="card-header single-rest-table-res-header">
          {reservations.reservationStatus === "free"
            ? "COMPLETED"
            : reservations.reservationStatus.toUpperCase()}
        </div>
        <div class="card-body">
          <h5 class="card-title">ID: {reservations._id.slice(-5)}</h5>
          <h5 class="card-title">{reservations.customer.customerName}</h5>

          {reservations.reservationStatus === "free" ||
          reservations.reservationStatus === "reserved" ? (
            <p class="card-text">Reserved Table: {reservations.tableNumber}</p>
          ) : null}
          <p class="card-text">
            Number of Persons: {reservations.numberOfPersons}
          </p>
          <p class="card-text">
            Requested Time: {reservations.reservationTime}
          </p>
          <p class="card-text">
            Requested Date: {reservations.reservationDate.slice(0, 10)}
          </p>
        </div>{" "}
        {/* <div class="card-footer text-muted card-header single-rest-table-res-footer">
          2 days ago
        </div> */}
      </div>
    </div>
  );
};

export default UserSingleTableReservation;
