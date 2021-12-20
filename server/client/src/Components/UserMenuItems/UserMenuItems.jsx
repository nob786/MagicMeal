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

//======================other imports
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const UserMenuItems = () => {
  var currentDate = new Date();
  // const [currentDate, setCurrentDate] = useState(new Date());
  const [persons, setPersons] = React.useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
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
  //Customer Data
  const { custData } = useSelector((state) => state.auth);

  //===================Category Tabs of Menu Items
  const arr = items.map((n, k) => {
    return items[k].category;
  });
  let arr2 = arr.filter((item, i, arr) => arr.indexOf(item) === i);
  //================================================

  const handleBookTableToggle = () => {
    console.log("arr", arr);
    console.log("arr2", arr2);
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

  const handleChangeNumberOfPersons = async (event) => {
    setPersons(event.target.value);
  };

  const handleBookTableRequest = (event) => {
    event.preventDefault();
    if (
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() > currentDate.getDate() &&
      date.getFullYear() === currentDate.getFullYear()
      //&&
      // Int time > currentDate.getHours()
    ) {
      // console.log("Order Place");
      //APi Call for Table Reservation
      //Order Post //
      let reservationData = {
        numberOfPersons: persons,
        reservationDate: date,
        reservationTime: time,
        customer: {
          customerName: custData.firstName + custData.lastName,
          customerId: custData._id,
        },
        restaurant: {
          restaurantName: restaurantData.restaurantName,
          restaurantId: restaurantData._id,
        },
      };

      console.log("Table Reservation Data", reservationData);
      axios
        .post(`/user/book-table`, reservationData, {
          headers: {
            authorization:
              localStorage.getItem("token") !== null
                ? JSON.parse(localStorage.getItem("token"))
                : null,
          },
        })
        .then((res) => {
          if (res) {
            toast.success(res.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
            //window.alert("Order Placed");
          } else console.log("Response Not Avalable");
        })
        .catch((err) => {
          console.log("Error in FE", err);
          toast.error(err.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        });
      //================end api
      // toast.success(`Table Reservation Request Sent`, {
      //   position: toast.POSITION.TOP_CENTER,
      //   autoClose: 2000,
      // });
    } else {
      toast.info(
        `Please Note: We only allow booking from Next Day to End of Current Month`,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        }
      );
    }
    // console.log("Current Date", currentDate.getTimezoneOffset());
    // console.log("Current", currentDate.getFullYear());
    // console.log("User", time);
    // console.log(
    //   "Date Day",
    //   currentDate.getHours() + ":" + currentDate.getMinutes()
    // );
    console.log("Persons", persons);
    console.log("Date", date);
    console.log("Time", time);
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
  ) : restaurantData.ActiveStatus === true ? (
    <div className="Menus">
      <div
        style={{
          background: restaurantData.imageUrl
            ? `url(${restaurantData.imageUrl})`
            : "url(https://images.pexels.com/photos/9535774/pexels-photo-9535774.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)",
        }}
        className="menu-restaurant-profile"
      >
        <div className="bg-text">
          <h2 className="user-menu-restaurant-name">
            {" "}
            {restaurantData.restaurantName}
          </h2>
          <br />
          <br />
          <br />
          <h3 className="user-menu-restaurant-address">
            {/* <LocationOnIcon />  */}
            {restaurantData.address &&
              restaurantData.address.toUpperCase()}{" "}
            <br />
            {/* <PhoneInTalkIcon /> */}
            {restaurantData.contact}
            <br />
            Type:{" "}
            {restaurantData.category &&
              restaurantData.category.toUpperCase()}{" "}
            <br />
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
            data-target="#bookTableModal"
            data-whatever="@mdo"
            className="user-book-table-button"
          >
            Book Table
          </button>
        </div>
      </div>

      <TitleTag title="Menu Items We Have" />

      {/*menu test */}
      {restaurantData.items.length === 0 ? (
        <div class="alert alert-secondary text-center m-5" role="alert">
          No Menu Found.{" "}
          <a href="/restaurants" class="alert-link">
            Click here to Browse Other Restaurants
          </a>
        </div>
      ) : (
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
            {arr2 &&
              arr2.map((tabName, k) => {
                return <Tab>{tabName}</Tab>;
              })}
          </TabList>
          {/* ====================================================================Active Reservations===================================================== */}
          {arr2 &&
            arr2.map((tabName, k) => {
              return (
                <TabPanel>
                  <div className="user-menus-grid">
                    {items &&
                      items
                        .filter((n) => n.category === tabName)
                        .map((item, index) => {
                          return (
                            <SingleUserMenu
                              key={index}
                              menu={item}
                              restId={restaurantData._id}
                              restName={restaurantData.restaurantName}
                              cont={restaurantData.contact}
                              quantity={1}
                            />
                          );
                        })}
                  </div>
                </TabPanel>
              );
            })}
        </Tabs>
      )}
      {/* menu test */}
      {/* {restaurantData.items.length === 0 ? (
        <div class="alert alert-secondary text-center" role="alert">
          No Menu Found.{" "}
          <a href="/restaurants" class="alert-link">
            Click here to Browse Other Restaurants
          </a>
        </div>
      ) : null} */}
      {/* <div className="user-menus-grid">
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
      </div> */}
      <div
        class="modal fade book-table-modal"
        id="bookTableModal"
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
                  <label for="book-table-person-number" class="col-form-label ">
                    Number of Persons:
                  </label>
                  <input
                    value={persons}
                    onChange={handleChangeNumberOfPersons}
                    type="number"
                    class="form-control form-control-lg "
                    id="book-table-person-number"
                    placeholder="Example: 4"
                  />
                </div>
                <div class="form-group text-center">
                  {/* <label for="message-text" class="col-form-label">
                    Message:
                  </label>
                  <textarea class="form-control" id="message-text"></textarea> */}
                  <DatePicker
                    className="timePick"
                    onChange={setDate}
                    value={date}
                  />
                </div>
                {/* <div class="form-group text-center">
                  <TimePicker
                    className="timePick"
                    onChange={setTime}
                    value={time}
                  />
                </div> */}
                <div class="form-group">
                  {/* <label for="book-table-person-number" class="col-form-label ">
                    Requested Time:
                  </label> */}
                  <input
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                      console.log("TIME SET", e.target.value);
                    }}
                    type="time"
                    class="form-control form-control-lg "
                    id="book-table-person-number"
                    placeholder="Example: 4"
                  />
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
                data-dismiss="modal"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div class="alert alert-secondary text-xl-center m-5 " role="alert">
      We are Sorry. The {restaurantData.restaurantName.toUpperCase()} has closed
      for now.
      <br />
      <a href="/restaurants" class="alert-link">
        Click here to Browse Other Restaurants
      </a>
    </div>
  );
};

export default UserMenuItems;
