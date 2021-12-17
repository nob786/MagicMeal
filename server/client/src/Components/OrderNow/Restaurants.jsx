import { SingleBed } from "@material-ui/icons";
import React, { useEffect, useState, Component } from "react";
import axios from "../../axios";
import { useParams } from "react-router";
import Geocode from "react-geocode";

//=========================MAterial Ui Imports=======================
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import InputAdornment from "@mui/material/InputAdornment";
//==========================Components and Css Import===============
import TitleTag from "../SpecialComp/TitleTag";
import SingleRestaurant from "./SingleRestaurant";
import "./Restaurants.css";
import { useHistory } from "react-router";

const Restaurants = () => {
  //Main Page Loader
  const [loading, setLoading] = useState(true);
  //Gps Icon Loader
  const [gpsLoading, setGpsLoading] = useState(false);
  const [location, setLocation] = React.useState({
    loaded: false,
    coordinates: { lat: "", long: "" },
  });
  const [currentAddress, setCurrentAddress] = React.useState("");

  //========================Search States===========================
  const [searchTerm, setSearchTerm] = useState("");
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  // const [dineInRestaurants, setDineInRestaurants] = useState([]);
  // const [pickupRestaurants, setPickupRestaurants] = useState([]);

  const [allRestaurants, setAllRestaurants] = useState([]);
  const [allRestaurants2, setAllRestaurants2] = useState([]);

  // const [filter, setFilter] = useState([]);
  // const [filterText, setFilterText] = useState("");
  //============================================================

  const history = useHistory();
  // const { lat } = useParams();

  // const { long } = useParams();

  //===============Handle CLick Gps==========================
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

  const handleClickGps = () => {
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(async (l) => {
      // console.log("location foiund", l);
      Geocode.fromLatLng(l.coords.latitude, l.coords.longitude).then(
        (response) => {
          // const address = response.results[0].formatted_address;
          // console.log("Current Address", address);
          setCurrentAddress(response.results[0].formatted_address);
          setGpsLoading(false);
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

  // Use Effect
  useEffect(async () => {
    const { data } = await axios.get("/user/get-restaurants");
    if (data) {
      console.log("Data was  fetched", data.data);
      let finalDataToLaod = data.data;
      setAllRestaurants(finalDataToLaod.filter((n) => n.ActiveStatus === true));

      // setAllRestaurants(
      //   allRestaurants2.sort((a, b) =>
      //     a.restaurantName - b.restaurantName ? 1 : -1
      //   )
      // );

      setAllRestaurants2(
        finalDataToLaod.filter((n) => n.ActiveStatus === true)
      );
      //console.log("ALL rest", allRestaurants);
      // setPickupRestaurants(
      //   finalDataToLaod.filter((rest) => rest.pickUp === true)
      // );
      // setDineInRestaurants(
      //   finalDataToLaod.filter((rest) => rest.dineIn === true)
      // );
      setLoading(false);
    } else {
      console.log("Could not fetch data");
      return null;
    }
  }, []);

  //Handel Find Restaurants
  const handleFindRestaurants = () => {
    if (location.loaded === true) {
      // history.push(
      //   `/restaurants/delivery/${location.coordinates.lat}&${location.coordinates.long}`
      // );
      const { nearbyData } = axios.get(
        `/restaurants-location/${location.coordinates.lat}/${location.coordinates.long}`
      );
      if (nearbyData) {
        setNearbyRestaurants(nearbyData);
        console.log("Got It", nearbyData);
      } else {
      }
    } else if (location.loaded === false) {
      console.log("Not Get It");
    }
    // window.alert(lat);
  };

  //======================================================Handel Search Restaurants

  // const searchRestaurants = () => {
  //   if (searchTerm !== null && searchTerm.match(/^[A-Za-z]+$/)) {
  //     setFilter(
  //       allRestaurants.filter((value) => {
  //         if (searchTerm === "") {
  //           return value;
  //         } else if (
  //           value.restaurantName
  //             .toLowerCase()
  //             .includes(searchTerm.toLowerCase())
  //         ) {
  //           return value;
  //         } else if (
  //           value.address.toLowerCase().includes(searchTerm.toLowerCase())
  //         ) {
  //           return value;
  //         }
  //       })
  //     );
  //     if (filter.length !== 0) {
  //       console.log("Found", filter);
  //       setFilterText("Results");

  //       // setAllRestaurants(filter);
  //     }
  //   } else if (searchTerm === null) {
  //     // setAllRestaurants(allRestaurants2);
  //     console.log("Not Found");
  //     setFilterText("Not Found");
  //   }
  // };

  //=========================================Search Filter Function ===========================
  const handlePickUpFilter = () => {
    if (allRestaurants2 || allRestaurants2 === "") {
      setAllRestaurants(allRestaurants2.filter((rest) => rest.pickUp === true));
    }
  };
  const handleDineInFilter = () => {
    if (allRestaurants2 || allRestaurants2 === "") {
      setAllRestaurants(allRestaurants2.filter((rest) => rest.dineIn === true));
    }
  };
  const handleBookTableFilter = () => {
    if (allRestaurants2 || allRestaurants2 === "") {
      setAllRestaurants(
        allRestaurants2.filter((rest) => rest.bookTable === true)
      );
    }
  };

  //================================================================ Main Return Function
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
    <div className="Restaurants">
      <div className="restaurant-page-location">
        <h1>GET NEARBY RESTAURANTS</h1>
        <div className="restaurant-location-container">
          <FormControl
            color="warning"
            className="restaurant-page-location-bar"
            sx={{ m: "10px" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Location
            </InputLabel>
            <OutlinedInput
              id="outlined"
              endAdornment={
                <InputAdornment position="end">
                  {gpsLoading === true ? (
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
              label="Location"
              value={currentAddress}
            />
          </FormControl>
          <button
            onClick={handleFindRestaurants}
            className="restaurant-page-button"
          >
            Find Restaurants
          </button>
        </div>
      </div>
      {/*================================================ Search Bar============================================== */}

      <div>
        <TitleTag title="Restaurants " />
        <form
          style={{ justifyContent: "center" }}
          class="form-inline my-2 my-lg-0 text-center"
        >
          <input
            style={{ height: "80px" }}
            class="form-control mr-sm-2 w-50"
            type="search"
            placeholder="Search by Restaurant Name, City or Category"
            aria-label="Search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <div class="dropdown ">
            <button
              style={{ height: "80px" }}
              class="btn btn-secondary dropdown-toggle "
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Filter Restaurants
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a onClick={handlePickUpFilter} class="dropdown-item">
                PICKUP
              </a>
              <a onClick={handleDineInFilter} class="dropdown-item">
                DINE-IN
              </a>
              <a onClick={handleBookTableFilter} class="dropdown-item">
                TABLE RESERVATION
              </a>
            </div>
          </div>
          {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button> */}
        </form>
      </div>
      {/* <TitleTag title="Search Test" /> */}
      <div className="restaurants_grid">
        {allRestaurants &&
          allRestaurants
            .filter((value) => {
              if (searchTerm === "") {
                return value;
              } else if (
                value.restaurantName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return value;
              } else if (
                value.address.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return value;
              } else if (
                value.category.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return value;
              }
            })
            .map((value, key) => (
              <SingleRestaurant key={key} restaurant={value} />
            ))}
      </div>

      {/* ========================================================Imlementation of Nearby Restaurants=============================== */}
      {/* <>
        <TitleTag title="Nearby Restaurants" />
        <br />
        <div className="restaurants_grid">
          {allRestaurants.map((item, key) => (
            <SingleRestaurant key={key} restaurant={item} />
          ))}
        </div>
      </> */}

      {/* =======================================================Imlementation of All Restaurants */}
      {/* <TitleTag title="All Restaurants" /> */}
      {/* <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <button onClick={searchRestaurants}>Search</button> */}
      {/* <br />
      <div className="restaurants_grid">
        {allRestaurants.map((value, key) => (
          <SingleRestaurant key={key} restaurant={value} />
        ))} */}
      {/* {allRestaurants
          .filter((value) => {
            if (searchTerm === "") {
              return value;
            } else if (
              value.restaurantName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return value;
            } else if (
              value.address.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return value;
            }
          })
          .map((value, key) => (
            <SingleRestaurant key={key} restaurant={value} />
          ))} */}
      {/* </div> */}

      {/* Imlementation of All Pickup Restaurants */}

      {/* {allRestaurants.filter((rest) => rest.pickUp === true) !== null ? (
        <>
          <TitleTag
            title="Pickup Restaurants"
            textAlign="center"
            marginLeft="3%"
            marginRight="3%"
            borderBottom="#272d2f 1px solid"
          />
          <div className="restaurants_grid">
            {allRestaurants
              .filter((rest) => rest.pickUp === true)
              .map((rest, key) => {
                return <SingleRestaurant key={key} restaurant={rest} />;
              })}
          </div>
        </>
      ) : null}

      <br /> */}
    </div>
  );
};

export default Restaurants;
