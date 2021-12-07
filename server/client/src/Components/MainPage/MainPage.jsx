import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Geocode from "react-geocode";
import axios from "../../axios";
/*=========================Importing CSS File=========================*/
import "../MainPage/MainPage.css";
import NewsLetter from "../SpecialComp/NewsLetter/NewsLetter";

/**=============================Importing Components====================== */
import PartenerImage from "../SpecialComp/PartenerImage/PartenerImage.jsx";

//=================================Material Ui Fonts===========================
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";
// import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { alpha, styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [location, setLocation] = React.useState({
    loaded: false,
    coordinates: { lat: "", long: "" },
  });
  const [helperText, setHelperText] = React.useState("");
  const [currentAddress, setCurrentAddress] = React.useState("");
  const history = useHistory();

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
    navigator.geolocation.getCurrentPosition(async (l) => {
      // console.log("location foiund", l);
      Geocode.fromLatLng(l.coords.latitude, l.coords.longitude).then(
        (response) => {
          // const address = response.results[0].formatted_address;
          // console.log("Current Address", address);
          setCurrentAddress(response.results[0].formatted_address);
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
      },
      (error) => {
        console.error(error);
      }
    );
  };
  // console.log("loc3", location);

  const handleDeliveryRestaurants = () => {
    // if (location.loaded === true) {
    //   history.push(
    //     `/restaurants/delivery/${location.coordinates.lat}&${location.coordinates.long}`
    //   );
    // } else if (location.loaded === true) {
    //   setHelperText("Selev");
    // }
  };

  const handlePickupRestaurants = () => {
    if (location.loaded === true) {
      history.push(
        `/restaurants/pickup/${location.coordinates.lat}&${location.coordinates.long}`
      );
    } else if (location.loaded === true) {
      setHelperText("Selev");
    }
  };

  return (
    <div className="MainPage">
      <div className="main-page-location">
        <h1>It's the food you love, delivered</h1>
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
                  <GpsFixedIcon
                    onClick={handleClickGps}
                    sx={{
                      color: "#fe724c",
                      cursor: "grab",
                    }}
                  />
                </InputAdornment>
              }
              label="Enter Full Address"
              // value={`${location.coordinates.lat} ${location.coordinates.long}`}\
              value={currentAddress}
            />
          </FormControl>
          <button
            className="main-page-delivery-button"
            onClick={handleDeliveryRestaurants}
          >
            DELIVERY
          </button>
          OR
          <button
            className="main-page-pickup-button"
            onClick={handlePickupRestaurants}
          >
            PICK UP
          </button>
        </div>
      </div>

      <div class="bd-example">
        <div
          id="carouselExampleCaptions"
          class="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active p1">
              {/*<img
                src="./Pictures/main2.jpg"
                class="d-block w-100"
                alt="Pehli Slide"
              />*/}
              <div class="carousel-caption d-md-block">
                <h1 className="main-page-slide-h1">
                  Get Food Delivered to Your Door Step!
                </h1>
                <p className="main-page-slide-p">
                  Place Order and the Restaurant will Deliver to your Location.
                </p>
                <Link to="/restaurants">
                  <button className="partner-button main-slide-button">
                    ORDER NOW
                  </button>
                </Link>
              </div>
            </div>
            <div class="carousel-item p2">
              {/*<img
                src="./Pictures/Gr2.jpg"
                class="d-block w-100"
                alt="ssissisi"
              />*/}
              <div class="carousel-caption d-md-block">
                <h1 className="main-page-slide-h1">
                  Go and Grab your Meal from Restaurant!
                </h1>
                <p className="main-page-slide-p">
                  Place Order and Pick it up from Restaurant.
                </p>
                <Link to="/restaurants/pickup">
                  <button className="partner-button main-slide-button">
                    ORDER NOW
                  </button>
                </Link>
              </div>
            </div>
            <div class="carousel-item p3">
              {/*<img
                src="./Pictures/Gr1.jpg"
                class="d-block w-100"
                alt="ssjisjks"
              />*/}
              <div class="carousel-caption d-md-block">
                <h1 className="main-page-slide-h1">
                  Wanna Book a Table for Your Family?
                </h1>
                <p className="main-page-slide-p">
                  Browser Restaurants and Book Table in Advance.
                </p>
                <Link to="/restaurant-signup">
                  <button className="partner-button main-slide-button">
                    BOOK TABLE
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <PartenerImage />

      <div className="clients">
        <div className="client-container">
          <div className="client-row">
            <div className="client-col-3">
              <div className="client">
                <h1>120</h1>
                <p>Restaurants</p>
              </div>
            </div>
            <div className="client-col-3">
              <div className="client">
                <h1>58</h1>
                <p>Menus</p>
              </div>
            </div>
            <div className="client-col-3">
              <div className="client">
                <h1>14868</h1>
                <p>Satisfied Clients</p>
              </div>
            </div>
            <div className="client-col-3">
              <div className="client">
                <h1>2031</h1>
                <p>orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default MainPage;
