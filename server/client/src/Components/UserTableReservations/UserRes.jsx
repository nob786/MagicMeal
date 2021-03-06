import axios from "axios";
import React, { Component, useEffect } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TitleTag from "../../Components/SpecialComp/TitleTag";
import "./UserRes.css";

//=====================================Redux Imports=================================
import { useDispatch, useSelector } from "react-redux";
import UserSingleTableReservation from "./UserSingleRes";

const UserTableReservation = () => {
  const [loading, setLoading] = React.useState(true);
  const [reservationData, setReservationData] = React.useState([]);
  //=======================Search Terms===================================
  const [activeSearchTerm, setActiveSearchTerm] = React.useState("");
  const [acceptedSearchTerm, setAcceptedSearchTerm] = React.useState("");
  const [completedSearchTerm, setCompletedSearchTerm] = React.useState("");
  const { custData } = useSelector((state) => state.auth);
  //===================================Filter Reservation Data======================================
  const activeReservations = reservationData.filter(
    (n) => n.reservationStatus === "pending"
  );
  const acceptedReservations = reservationData.filter(
    (n) => n.reservationStatus === "reserved"
  );
  const completedReservations = reservationData.filter(
    (n) => n.reservationStatus === "free" || n.reservationStatus === "cancelled"
  );

  //======================================= Use Effect ============================================

  useEffect(async () => {
    let customerId = custData._id;
    // console.log("customer Id", customerId);
    //window.alert(id);
    const { data } = await axios.get(
      `/user/get-my-reservations/${customerId}`,
      {
        headers: {
          authorization:
            localStorage.getItem("token") !== null
              ? JSON.parse(localStorage.getItem("token"))
              : null,
        },
      }
    );
    console.log("User Side Reservation Whole response Data", data);
    if (data) {
      //console.log("Data Fetched", data.data.items);
      console.log("User Side Reservation Data", data.reservations);
      setReservationData(data.reservations);
      //   let finalLoadedData = data.data.items;
      //let restaurantId=data.data._id;

      // setRestaurantId(data.data._id);
      // setRestaurantName(data.data.restaurantName);
      // setContact(data.data.contact);
      setLoading(false);
    } else {
      console.log("Could not fetch data.");
    }
  }, []);
  return loading === true ? (
    <div class="d-flex justify-content-center">
      <div
        class="spinner-border m-5"
        role="status"
        style={{ color: "#fe724c" }}
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="rest-table-res-div">
      <Tabs
        style={{
          // textAlign: "center",
          //   marginTop: "5%",

          marginBottom: "5%",
          // marginRight: "5%",
          // marginLeft: "5%",
          fontSize: "20px",
        }}
      >
        <TabList
          style={{
            paddingTop: "10px",
            minHeight: "70px",
            // backgroundColor: "white",
            color: "#272d2f",
            textAlign: "center",
          }}
        >
          <Tab style={{}}>Pending Reservations</Tab>
          <Tab>Reserved Tables</Tab>
          <Tab>Completed/Cancelled Reservations</Tab>
          {/* <Tab style={{ transitionDuration: "1.2s" }}>QR Code Generator</Tab> */}
        </TabList>
        {/* ====================================================================Active Reservations===================================================== */}
        <TabPanel>
          {" "}
          <TitleTag title="pending Reservations" paddingBottom="10px" />
          <form
            style={{ justifyContent: "center" }}
            class="form-inline my-2 my-lg-0 text-center"
          >
            <input
              class="form-control mr-sm-2 w-50 form-control-lg"
              type="search"
              placeholder="Search by Reservation-ID or Date"
              aria-label="Search"
              value={activeSearchTerm}
              onChange={(event) => {
                setActiveSearchTerm(event.target.value);
              }}
            />
            {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button> */}
          </form>
          {activeReservations.length > 0 ? (
            activeReservations &&
            activeReservations
              .filter((val) => {
                if (activeSearchTerm === "") {
                  return val;
                } else if (val._id.includes(activeSearchTerm)) {
                  return val;
                } else if (val.reservationDate.includes(activeSearchTerm)) {
                  return val;
                }
              })
              .map((order, index) => (
                <UserSingleTableReservation key={index} reservations={order} />
              ))
          ) : (
            <div class="alert alert-secondary text-center m-5" role="alert">
              No Reservations Found.{" "}
              <a href="/restaurants" class="alert-link"></a>
            </div>
          )}
        </TabPanel>

        {/* =============================================================================Reserved Tables============================================================ */}
        <TabPanel>
          <TitleTag title="Reserved Tables" />
          <form
            style={{ justifyContent: "center" }}
            class="form-inline my-2 my-lg-0 text-center"
          >
            <input
              class="form-control mr-sm-2 w-50 form-control-lg"
              type="search"
              placeholder="Search by Reservation-ID or Table Number or Date"
              aria-label="Search"
              value={acceptedSearchTerm}
              onChange={(event) => {
                setAcceptedSearchTerm(event.target.value);
              }}
            />
            {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button> */}
          </form>
          {acceptedReservations.length > 0 ? (
            acceptedReservations &&
            acceptedReservations
              .filter((val) => {
                if (acceptedSearchTerm === "") {
                  return val;
                } else if (val._id.includes(acceptedSearchTerm)) {
                  return val;
                } else if (
                  val.tableNumber &&
                  String(val.tableNumber).includes(acceptedSearchTerm)
                ) {
                  return val;
                } else if (
                  val.reservationDate &&
                  val.reservationDate.includes(acceptedSearchTerm)
                ) {
                  return val;
                }
              })
              .map((order, index) => (
                <UserSingleTableReservation key={index} reservations={order} />
              ))
          ) : (
            <div class="alert alert-secondary text-center m-5" role="alert">
              No Reservations Found.{" "}
              <a href="/restaurants" class="alert-link"></a>
            </div>
          )}
        </TabPanel>

        {/* ===========================================================Completed Reservations=============================================== */}
        <TabPanel>
          {" "}
          <TitleTag title="Completed / Cancelled Reservations" />
          <form
            style={{ justifyContent: "center" }}
            class="form-inline my-2 my-lg-0 text-center"
          >
            <input
              class="form-control mr-sm-2 w-50 form-control-lg"
              type="search"
              placeholder="Search by Reservation-ID or Table Number or Date"
              aria-label="Search"
              value={completedSearchTerm}
              onChange={(event) => {
                setCompletedSearchTerm(event.target.value);
              }}
            />
            {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button> */}
          </form>
          {completedReservations.length > 0 ? (
            completedReservations &&
            completedReservations
              .filter((val) => {
                if (completedSearchTerm === "") {
                  return val;
                } else if (
                  val._id &&
                  val._id
                    .toLowerCase()
                    .includes(completedSearchTerm.toLowerCase())
                ) {
                  return val;
                } else if (
                  val.reservationDate &&
                  val.reservationDate
                    .toLowerCase()
                    .includes(completedSearchTerm.toLowerCase())
                ) {
                  return val;
                }
                // else if (val.reservationDate.includes(activeSearchTerm)) {
                //   return val;
                // }
              })
              .map((order, index) => (
                <UserSingleTableReservation key={index} reservations={order} />
              ))
          ) : (
            <div class="alert alert-secondary text-center m-5" role="alert">
              No Reservations Found.{" "}
              <a href="/restaurants" class="alert-link"></a>
            </div>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default UserTableReservation;
