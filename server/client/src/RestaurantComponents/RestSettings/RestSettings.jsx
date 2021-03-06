import React, { Component } from "react";
import axios from "axios";
import Geocode from "react-geocode";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TitleTag from "../../Components/SpecialComp/TitleTag";
import QrGenerator from "../QrCodeGen/QrGen";
import "./RestSettings.css";
//==================Material Ui Imports=============================
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
//====================Redux Imports =============================//
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantData } from "../../Redux/actions/authentication";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const RestSettings = () => {
  const dispatch = useDispatch();
  const { restData } = useSelector((state) => state.auth);
  //Orders Settings

  //

  const [loading, setLoading] = React.useState(false);
  const [location, setLocation] = React.useState({
    loaded: false,
    coordinates: { lat: "", long: "" },
  });
  const [currentAddress, setCurrentAddress] = React.useState(
    restData.location.address ? restData.location.address : ""
  );

  const [val, setVal] = React.useState();

  const getChangeValue = (event) => {
    setVal(event.target.value);
    console.log("Switch Value", event.target.value);
  };

  //=======================================================Upload Location and Google Gps Api Implementation=====================================

  //=======================Google APi Implementation===================
  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey("AIzaSyDVU4OuR8QfN2mlaNw8HQDPTC2JusVQtHY");

  // set response language. Defaults to english.
  Geocode.setLanguage("en");

  // set response region. Its optional.
  // A Geocoding request with region=es (Spain) will return the Spanish city.
  Geocode.setRegion("es");

  // set location_type filter . Its optional.
  // google geocoder returns more that one address for given lat/lng.
  // In some case we need one address as response for which google itself provides a location_type filter.
  // So we can easily parse the result for fetching address components
  // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
  // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
  Geocode.setLocationType("ROOFTOP");

  // Enable or disable logs. Its optional.
  Geocode.enableDebug();
  //=========================================================================

  // useEffect(async () => {
  //   navigator.geolocation.getCurrentPosition((l) => {
  //     setLocation({
  //       loaded: true,
  //       coordinates: {
  //         lat: l.coords.latitude,
  //         long: l.coords.longitude,
  //       },
  //     });
  //   });
  // }, []);
  const handleClickGps = async () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (l) => {
      // console.log("location foiund", l);
      Geocode.fromLatLng(l.coords.latitude, l.coords.longitude).then(
        (response) => {
          // const address = response.results[0].formatted_address;
          // console.log("Current Address", address);
          setCurrentAddress(response.results[0].formatted_address);
          setLoading(false);
        },
        (error) => {
          console.error(error);
        }
      );
      setLocation({
        loaded: true,
        coordinates: {
          lat: l.coords.latitude,
          long: l.coords.longitude,
        },
      });
    });
    // console.log("jshdjsdh");
    Geocode.fromLatLng(
      location.coordinates.lat,
      location.coordinates.long
    ).then(
      (response) => {
        // const address = response.results[0].formatted_address;
        // console.log("Current Address", address);

        setCurrentAddress(response.results[0].formatted_address);
        // setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const handleUploadLocation = async () => {
    let lat = location.coordinates.lat;
    let lng = location.coordinates.long;
    let address = currentAddress;
    await axios
      .post(
        `/item/upload-location`,
        {
          lat: String(lat),
          lng: String(lng),
          address: String(address),
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
      .then((res) => {
        // console.log("Successful");
        dispatch(updateRestaurantData());
        toast.success(`Location Updated Successfully`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        // console.log("Un-Successful");
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };

  // console.log(restData._id);
  return (
    <div>
      <TitleTag title="Settings" />{" "}
      <Tabs
        style={{
          textAlign: "center",
          //   marginTop: "5%",
          marginBottom: "5%",
          marginRight: "5%",
          marginLeft: "5%",
          fontSize: "20px",
        }}
      >
        <TabList
          style={{
            backgroundColor: "#f3724c",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <Tab style={{ transitionDuration: "1.2s" }}>Profile Settings</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>Orders Settings</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>Reservation Settings</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>QR Code Generator</Tab>
        </TabList>
        {/* ====================================================================Profile Settings===================================================== */}
        <TabPanel>
          <div className="main-page-location-container">
            <FormControl
              color="warning"
              className="main-page-location-bar"
              sx={{ m: 1, maxWidth: "600px" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Select Location
              </InputLabel>
              <OutlinedInput
                id="outlined"
                endAdornment={
                  <InputAdornment position="end">
                    {loading === true ? (
                      <div class="d-flex justify-content-center">
                        <div
                          class="spinner-border"
                          role="status"
                          style={{ color: "#fe724c" }}
                        >
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <GpsFixedIcon
                        onClick={handleClickGps}
                        sx={{
                          color: "#fe724c",
                          cursor: "grab",
                        }}
                      />
                    )}
                  </InputAdornment>
                }
                label="Enter Full Address"
                // value={`${location.coordinates.lat} ${location.coordinates.long}`}\
                value={currentAddress}
              />
            </FormControl>
            <button
              className="rest-profile-upload-location-button"
              onClick={handleUploadLocation}
            >
              Update Location
            </button>
          </div>
        </TabPanel>

        {/* =============================================================================Orders Settings============================================================ */}
        <TabPanel>
          {/* <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onClick={(e) => {
                console.log("chjeckk box", e.target.value);
              }}
              onChange={(e) => {
                console.log("chjeckk box", e.target.value);
              }}
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              Default switch checkbox input
            </label>
            
          </div> */}
          <div>
            <input defaultChecked type="radio" value="true" name="gender" />{" "}
            Enable Pickup Orders{"              "}
            <input type="radio" value="false" name="gender" /> Disable Pickup
            Orders
          </div>
          <br />
          <div>
            <input type="radio" value="true" name="gender" /> Enable DineIn
            Orders{"              "}
            <input type="radio" value="false" name="gender" /> Disable DineIn
            Orders
          </div>
        </TabPanel>

        <TabPanel>
          <div>
            <input type="radio" value="true" name="gender" /> Enable Table
            Reservations{"  "}
            <input type="radio" value="false" name="gender" /> Disable Table
            Reservations
          </div>
          <br />
        </TabPanel>

        <TabPanel>
          <QrGenerator id={restData._id} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default RestSettings;
