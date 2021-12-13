import React, { Component } from "react";
import axios from "axios";
//==========================Redux imports===================================

import { useDispatch, useSelector } from "react-redux";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const UserSingleTableReservation = ({ reservations }) => {
  return (
    <div style={{ marginTop: "50px" }}>
      {/* <button on onClick={updateReservationStatus}>
        djdhjsd
      </button> */}
      <div style={{ borderRadius: "20%" }} class="card text-center w-50 m-auto">
        <div class="card-header single-rest-table-res-header">
          {reservations.reservationStatus === "free"
            ? "COMPLETED"
            : reservations.reservationStatus.toUpperCase()}
        </div>
        <div class="card-body">
          <h5 class="card-title">{reservations.customer.customerName}</h5>

          {reservations.reservationStatus !== "pending" ? (
            <p class="card-text">Reserved Table: {reservations.tableNumber}</p>
          ) : null}
          <p class="card-text">
            Number of Persons: {reservations.numberOfPersons}
          </p>
          <p class="card-text">
            Requested Time: {reservations.reservationTime}
          </p>
          <p class="card-text">
            Requested Date: {reservations.reservationDate}
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
