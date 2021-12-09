import { SingleBed } from "@material-ui/icons";
import React, { useState, useEffect, Component } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

import TitleTag from "../SpecialComp/TitleTag";
import SingleUserMenu from "./SingleUserMenu";
import axios from "../../axios";
import "./UserMenuItems.css";

//=====================================Redux Imports=================================
import { useDispatch, useSelector } from "react-redux";

//======================================MAterial UI Imports =======================
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

//=========================oTHER iMPORTS==========================
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const UserMenuItems = () => {
  var currentDate = new Date();
  // const [currentDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [loading, setLoading] = React.useState(false);
  const [restaurantData, setRestaurantData] = React.useState([]);
  const [items, setItems] = React.useState([]);
  // const [restaurantId, setRestaurantId] = React.useState();
  // const [restaurantName, setRestaurantName] = React.useState();
  // const [contact, setContact] = React.useState();
  const { id } = useParams();
  const history = useHistory();

  //Auth
  const { authCust } = useSelector((state) => state.auth);

  const { clickedRestaurantId } = useSelector((state) => state.data);
  const { clickedRestaurantData } = useSelector((state) => state.data);

  //const restId = clickedRestaurantId;

  const handleBookTableToggle = () => {
    if (authCust === false) {
      // console.log("toggle Data", String(restaurantData.bookTable));
      history.push("/foodie-login");
      toast.info(`Please Login First to Book Table`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    } else if (authCust === true && restaurantData.bookTable === false) {
      toast.info(`Restaurant Has Disabled Table Reservation`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    }
  };
  const handleBookTableRequest = () => {
    if (
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() > currentDate.getDate() &&
      date.getFullYear() === currentDate.getFullYear()
      //&&
      // Int time > currentDate.getHours()
    ) {
      // console.log("Order Place");
      toast.success(`Table Reservation Request Sent`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      toast.info(`Booking Only Allow from Next Day`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    // console.log("Current Date", currentDate.getTimezoneOffset());
    // console.log("Current", currentDate.getFullYear());
    // console.log("User", time);
    // console.log(
    //   "Date Day",
    //   currentDate.getHours() + ":" + currentDate.getMinutes()
    // );
    // console.log("Time", time);
  };

  useEffect(async () => {
    //window.alert(id);
    const { data } = await axios.get(`/user/get-restaurant-menu/${id}`, {
      /*headers: {
        authorization:
          localStorage.getItem("token") !== null
            ? JSON.parse(localStorage.getItem("token"))
            : null,
      },*/
    });
    console.log("Whole response Data", data);
    if (data) {
      //console.log("Data Fetched", data.data.items);
      console.log("Restaurant", data.data);
      let finalLoadedData = data.data.items;
      //let restaurantId=data.data._id;
      setRestaurantData(data.data);
      setItems(finalLoadedData);
      // setRestaurantId(data.data._id);
      // setRestaurantName(data.data.restaurantName);
      // setContact(data.data.contact);
      setLoading(true);
    } else {
      console.log("Could not fetch data.");
    }
  }, []);
  console.log("This ID", items);

  return loading === false ? (
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
    <div className="Menus">
      <div
        style={{
          background:
            "url(https://images.pexels.com/photos/9535774/pexels-photo-9535774.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)",
        }}
        className="menu-restaurant-profile"
      >
        {/* <img
          src="https://images.pexels.com/photos/9535774/pexels-photo-9535774.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="new"
        /> */}
        {/* <span className="user-menu-restaurant-name">
          {clickedRestaurantData.restaurantName}{" "}
        </span>
        <br />
        <br />
        <br />
        <span className="user-menu-restaurant-address">
          <LocationOnIcon /> {clickedRestaurantData.address}{" "}
        </span>
        <br />
        <span className="user-menu-restaurant-contact">
          <PhoneInTalkIcon /> {clickedRestaurantData.contact}{" "}
        </span>
        <br />
        <span className="user-menu-restaurant-category">
          Type: {clickedRestaurantData.category}{" "}
        </span>
        <br /> */}
        <div className="bg-text">
          <h2 className="user-menu-restaurant-name">
            {" "}
            {restaurantData.restaurantName}
          </h2>
          <br />
          <br />
          <br />
          <h3 className="user-menu-restaurant-address">
            <LocationOnIcon /> {restaurantData.address} <br />
            <PhoneInTalkIcon /> {restaurantData.contact}
            <br />
            Type: {restaurantData.category} <br />
          </h3>
          <br />
          <button
            onClick={handleBookTableToggle}
            type="button"
            class="btn btn-primary"
            data-toggle={
              restaurantData.bookTable === true && authCust === true
                ? "modal"
                : null
            }
            data-target="#exampleModal"
            data-whatever="@mdo"
            className="user-book-table-button"
          >
            Book Table
          </button>
        </div>
      </div>

      <TitleTag title="Menu Items We Have" />
      {restaurantData.items.length === 0 ? (
        <div class="alert alert-secondary text-center" role="alert">
          No Menu Found.{" "}
          <a href="/restaurants" class="alert-link">
            Click here to Browse Other Restaurants
          </a>
        </div>
      ) : null}
      <div className="user-menus-grid">
        {items.map((item, index) => (
          <SingleUserMenu
            key={index}
            menu={item}
            restId={restaurantData._id}
            restName={restaurantData.restaurantName}
            cont={restaurantData.contact}
            quantity={1}
          />
        ))}
      </div>
      <div
        class="modal fade book-table-modal"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Table Reservation Request
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Number of Persons:
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="recipient-name"
                  />
                </div>
                <div class="form-group">
                  {/* <label for="message-text" class="col-form-label">
                    Message:
                  </label>
                  <textarea class="form-control" id="message-text"></textarea> */}
                  <DatePicker onChange={setDate} value={date} />
                </div>
                <div class="form-group">
                  <TimePicker onChange={setTime} value={time} />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleBookTableRequest}
                type="button"
                class="btn book-table-send-button"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenuItems;
