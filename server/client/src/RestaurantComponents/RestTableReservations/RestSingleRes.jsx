import React, { Component } from "react";
import axios from "axios";
import "./RestRes.css";
const RestSingleTableReservation = ({ reservations }) => {
  const [tableNumber, setTableNumber] = React.useState();
  let date = reservations.reservationDate;

  //==============================Update Reservation Status===============================
  const updateReservationStatus = async () => {
    // const restId = restData._id;
    let reservationStatus = "free";
    await axios
      .put(
        `/item//update-reservation-status`,
        {
          reservationStatus: reservationStatus,
          reservationId: "61b295fde981632c84b3e9dc",
          customerId: "6195663883972436008dd0eb",
          //   tableNumber: "12",
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
  //================================================Approve with Table Number===========================================
  const approveWithTableNumber = () => {};
  //================================================Cancel Table Reservations===========================================
  const cancelTableReservation = () => {};
  return (
    <div>
      {/* <button on onClick={updateReservationStatus}>
        djdhjsd
      </button> */}
      <div class="card text-center m-5">
        <div class="card-header single-rest-table-res-header">
          {reservations.reservationStatus.toUpperCase()}
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
        {/* =================Pending Status Button */}
        {reservations.reservationStatus === "pending" ? (
          <form
            style={{ justifyContent: "center", marginBottom: "30px" }}
            class="form-inline"
          >
            <label class="sr-only">Enter Estimated Ready Time in Minutes</label>
            <input
              type="number"
              class="form-control"
              id="inputPassword2"
              placeholder="Enter Table Nummber"
              onChange={(event) => {
                setTableNumber(event.target.value);
                //   console.log("ready time", event.target.value);
              }}
              value={tableNumber}
            />
            {/* </div> */}
            <button
              onClick={approveWithTableNumber}
              className="update-order-status-button"
              class="btn update-order-status-time-button"
            >
              Approve Reservation
            </button>
          </form>
        ) : null}
        {/* Accepted Status  Status */}
        {reservations.reservationStatus === "reserved" ? (
          <div class="dropdown">
            <button
              className="update-order-status-button"
              class="btn dropdown-toggle update-order-status-button"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Update Reservation Status
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button class="dropdown-item">Reserve this Table</button>
              <button disabled class="dropdown-item">
                Table Has Free
              </button>
            </div>
          </div>
        ) : null}
        {/* <div class="card-footer text-muted card-header single-rest-table-res-footer">
          2 days ago
        </div> */}
      </div>
    </div>
  );
};

export default RestSingleTableReservation;
