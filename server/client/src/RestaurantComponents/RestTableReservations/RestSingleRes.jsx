import React, { Component } from "react";
import axios from "axios";
import "./RestRes.css";
//==========================Redux imports===================================

import { useDispatch, useSelector } from "react-redux";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const RestSingleTableReservation = ({ reservations }) => {
  const [tableNumber, setTableNumber] = React.useState();
  //   let date = reservations.reservationDate;
  const { restData } = useSelector((state) => state.auth);

  //==============================Update Reservation Status===============================
  const updateReservationStatus = async () => {
    // const restId = restData._id;
    // let reservationStatus;
    if (reservations.reservationStatus === "reserved")
      //   reservationStatus = "free";
      await axios
        .put(
          `/item//update-reservation-status`,
          {
            reservationStatus: "free",
            reservationId: reservations._id,
            customerId: reservations.customer.customerId,
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
          console.log("Table Reservation Completed", response);
          //window.alert("Order Successfully Approved");
          toast.success(`Order Approved`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setTimeout(
            () => window.location.replace("/admin/table-reservations"),
            1000
          );
        });
  };
  //================================================Approve with Table Number===========================================
  const approveWithTableNumber = async () => {
    await axios
      .put(
        `/item//update-reservation-status`,
        {
          reservationStatus: "reserved",
          reservationId: reservations._id,
          customerId: reservations.customer.customerId,
          tableNumber: tableNumber,
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
        // console.log("Update Reservation Status", response);
        //window.alert("Order Successfully Approved");
        toast.success(`Table Reserved`, {
          position: toast.POSITION.TOP_CENTER,
          autoclose: 2000,
        });
        setTimeout(
          () => window.location.replace("/admin/table-reservations"),
          1000
        );
      });
  };
  //================================================Cancel Table Reservations===========================================
  const cancelTableReservation = async () => {
    await axios
      .put(
        `/item//update-reservation-status`,
        {
          reservationStatus: "cancelled",
          reservationId: reservations._id,
          customerId: reservations.customer.customerId,
          //   tableNumber: tableNumber,
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
        // console.log("Update Reservation Status", response);
        //window.alert("Order Successfully Approved");
        toast.success(`Table Reservation Request Rejected`, {
          position: toast.POSITION.TOP_CENTER,
          autoclose: 2000,
        });
        setTimeout(
          () => window.location.replace("/admin/table-reservations"),
          1000
        );
      });
  };
  return (
    <div style={{ marginTop: "50px" }}>
      {/* <button on onClick={updateReservationStatus}>
        djdhjsd
      </button> */}
      <div class="card text-center m-5 w-50 m-auto mt-5">
        <div
          style={{ backgroundColor: "#fe724c" }}
          class="card-header single-rest-table-res-header"
        >
          {reservations.reservationStatus === "free" ? (
            <h3>COMPLETED</h3>
          ) : (
            <h3>{reservations.reservationStatus.toUpperCase()}</h3>
          )}
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
            Requested Date: {reservations.reservationDate.slice(0, 10)}
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
              <button disabled class="dropdown-item">
                Reserve this Table
              </button>
              <button onClick={updateReservationStatus} class="dropdown-item">
                Table Has Free
              </button>
            </div>
          </div>
        ) : null}
        {reservations.reservationStatus === "pending" ? (
          // <button onClick={cancelOrder}>Cancel/Reject Order</button>
          // <button onClick={cancelOrder}>Cancel/Reject Order</button>
          <button
            onClick={cancelTableReservation}
            style={{ marginTop: "30px" }}
            type="button"
            class="btn btn-warning m-10 w-90 m-auto"
          >
            Cancel/Reject Reservation Request
          </button>
        ) : null}
        {/* <div class="card-footer text-muted card-header single-rest-table-res-footer">
          2 days ago
        </div> */}
      </div>
    </div>
  );
};

export default RestSingleTableReservation;
