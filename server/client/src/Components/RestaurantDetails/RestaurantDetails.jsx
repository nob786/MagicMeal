import React, { Component, useEffect } from "react";
//======================================MAterial UI Imports =======================

import DirectionsIcon from "@mui/icons-material/Directions";
import TitleTag from "../SpecialComp/TitleTag";
import { Divider } from "@material-ui/core";
import { Box } from "@mui/system";
import { Rating } from "@mui/material";
import axios from "axios";
const RestaurantDetails = (restaurant) => {
  const [commentsData, setCommentsData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  // console.log("Restaurant detail", restaurant);
  useEffect(async () => {
    axios
      .get(`/user/get-comments/${restaurant.restaurant._id}`)
      .then((res) => {
        console.log("Comments Response", res.data.comments);
        setCommentsData(res.data.comments);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Comments Response Error", err);
        setLoading(false);
      });
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <button
        type="button"
        class="btn boot-button"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Details
      </button>

      <div
        class="modal fade"
        id="exampleModalCenter"
        // tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header boot-modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                {restaurant.restaurant.restaurantName
                  ? restaurant.restaurant.restaurantName + " Details"
                  : null}
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
            <div style={{ textAlign: "start" }} class="modal-body">
              <form>
                <div class="form-group">
                  <div style={{ textAlign: "center" }}>
                    {restaurant.restaurant.address && (
                      <a
                        style={{ color: "black", textDecoration: "none" }}
                        target="_blank"
                        href={
                          "https://maps.google.com/?q=" +
                          restaurant.restaurant.location.lat +
                          "," +
                          restaurant.restaurant.location.lng
                        }
                      >
                        <DirectionsIcon /> Directions
                      </a>
                    )}
                  </div>
                  <br />
                  <span>
                    Phone Number:{" "}
                    {restaurant.restaurant.contact
                      ? restaurant.restaurant.contact
                      : "N/A"}
                  </span>
                  <br />
                  <span>
                    Restaurant Category:{" "}
                    {restaurant.restaurant.category
                      ? restaurant.restaurant.category.toUpperCase()
                      : "N/A"}
                  </span>
                </div>
              </form>
              {/* <TitleTag title="REVIEWS" /> */}
              <h5 style={{ fontWeight: "bold" }}>Reviews</h5>
              {loading === true ? (
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
                <div class="list-group">
                  {commentsData.length > 0
                    ? commentsData.map((event, key) => {
                        return (
                          <a class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                              <h5 class="mb-1">
                                <Box
                                  component="fieldset"
                                  mb={0}
                                  borderColor="transparent"
                                >
                                  <Rating
                                    name="half-rating-read"
                                    defaultValue={event.rating}
                                    precision={1}
                                    readOnly
                                  />
                                </Box>
                              </h5>
                              <small>{event.date.slice(0, 10)}</small>
                            </div>
                            <p class="mb-1">{event.comment}</p>
                          </a>
                        );
                      })
                    : "No Feedback Found"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
