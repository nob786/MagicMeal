import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

//=================Importing Css File =====================//
import "./RatingModal.css";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RatingModal = (order) => {
  const [errors, setErrors] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState({
    rating: 0,
    comments: "",
  });

  const [hover, setHover] = React.useState(-1);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setData({ ...data, [name]: value });
  };

  React.useEffect(() => {
    console.log("Orders", order.order._id);
  }, []);

  const labels = {
    1: "Extremely Poor",
    2: "Poor",
    3: "Ok",
    4: "Very Good",
    5: "Outstanding",
  };

  const validate = (data) => {
    let errors = {};

    if (data.rating || data.rating === 0) {
      if (data.rating === 0) {
        errors.rating = "Please Select Rating";
      }
    }

    if (data.comments || data.comments === "") {
      if (data.comments === "") {
        errors.comments = "Comments Field cannot be Empty";
      } else if (
        !/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(data.comments)
      ) {
        errors.comments = "Comments can only contains characters and spaces";
      }
    }
    return errors;
  };

  const handleSubmitReview = (event) => {
    setLoading(true);
    event.preventDefault();
    console.log("Review Data", data);
    setErrors(validate(data));
    if (Object.keys(validate(data)).length === 0) {
      axios
        .post(
          `/user/post-comment`,
          {
            restaurantId: order.order.restaurant.restaurantId,
            // name: order.restaurant.restaurantName,

            // customer: {
            //   customerId: order.customer.customerId,
            //   name: order.customer.customerName,
            // },
            rating: data.rating,
            comment: data.comments,
            date: new Date(),
            orderId: order.order._id,
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
          // console.log("Review Response", res);
          setTimeout(() => {
            window.location.replace("/user/orders-history");
          }, 1000);

          toast.success("Review Submitted Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((err) => {
          // console.log("Review Error", err);
          toast.success("Review Submitted Failed", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    } else if (Object.keys(validate(data)).length > 0) {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {(order.order.status === "delivered" &&
        order.order.isReviewSubmitted === false) ||
      (order.order.status === "cancelled" &&
        order.order.isReviewSubmitted === false) ? (
        <button
          type="button"
          class="btn rating-modal-submit-button"
          data-toggle="modal"
          data-target={"#" + "s" + String(order.order._id)}
        >
          Share Review
        </button>
      ) : order.order.isReviewSubmitted === true ? (
        <button disabled type="button" class="btn rating-modal-submit-button">
          Review Submitted
        </button>
      ) : null}

      <div
        class="modal fade"
        id={"s" + String(order.order._id)}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header rating-modal-header">
              <h5 class="modal-title rating-modal-title">Order Review</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              {" "}
              <Typography
                style={{ color: "#272d2f", fontWeight: "bolder" }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                How was your experience with{" "}
                {order.order.restaurant.restaurantName &&
                  order.order.restaurant.restaurantName}
                ?
              </Typography>
              <br />
              <Rating
                size="large"
                name="rating"
                value={data.rating}
                precision={1}
                onChange={handleChange}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {data.rating !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover !== -1 ? hover : data.rating]}
                </Box>
              )}
              {errors.rating ? (
                <div
                  style={{
                    color: "red",
                    margin: "5px",
                    fontSize: "12px",
                    marginLeft: "3%",
                  }}
                >
                  {" "}
                  {errors.rating}
                </div>
              ) : (
                ""
              )}
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div class="form-group">
                  {/* <input
                    type="text"
                    class="form-control"
                    id="inputAddress2"
                    placeholder="Comments"
                    maxLength={100}
                  /> */}
                  <textarea
                    name="comments"
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Comments"
                    maxLength={100}
                    value={data.comments}
                    onChange={handleChange}
                  ></textarea>
                  {errors.comments ? (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                      }}
                    >
                      {" "}
                      {errors.comments}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Typography>
              <button
                onClick={handleSubmitReview}
                type="button"
                class="btn btn-lg btn-block mt-5 rating-modal-submit-button"
                data-dismiss="modal"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Button onClick={handleOpen}>Share Review</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            How was your experience with{" "}
            {order.order.restaurant.restaurantName &&
              order.order.restaurant.restaurantName}
            {order.order.grandTotal}?
          </Typography>
          <br />
          <Rating
            style={{ textAlign: "center" }}
            name="hover-feedback"
            value={value}
            precision={1}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <button type="button" class="btn btn-secondary btn-lg btn-block mt-5">
            Block level button
          </button>
        </Box>
      </Modal> */}
    </div>
  );
};

export default RatingModal;
