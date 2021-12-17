import React from "react";
import axios from "../../../axios";
import Button from "../Button/Button";
import "./NewsLetter.css";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const NewsLetter = () => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [validateErrors, setValidateErrors] = React.useState({});

  const validateNewsLetter = (email) => {
    let errors = {};

    if (email === "") {
      errors.email = "Email is Required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid Email Format";
    }
    return errors;
  };

  const subscribeNewsletter = () => {
    setLoading(true);
    setValidateErrors(validateNewsLetter(email));
    // console.log("Errors", errors);
    if (Object.keys(validateNewsLetter(email)).length === 0) {
      axios
        .post("/public/subscribe-to-newsletter", { email })
        .then((res) => {
          //console.log("Subscription data", res.data.message);
          if (res.data.message) {
            toast.success(res.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
            setLoading(false);
          } else {
            toast.success("Successfully Subscribed", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          // console.log("error", err._message);
          toast.error("Validation Error", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setLoading(false);
        });
    } else if (Object.keys(validateNewsLetter(email)).length > 0) {
      setLoading(false);
    }
  };

  const handleChangeEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
    console.log(email);
  };

  return (
    <section class="newsletter">
      <div class="newsletter-cont">
        <h2 className="newsletter-title">Subscribe to our Newsletter</h2>

        <div className="newsletter_cont">
          <input
            value={email}
            onChange={handleChangeEmail}
            className="newsletter-field"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
          />
          {validateErrors.email ? (
            <div
              style={{
                color: "red",

                fontSize: "14px",
              }}
            >
              {" "}
              {validateErrors.email}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="subscribe_button">
          <button
            className="newsletter-submit-button"
            onClick={subscribeNewsletter}
          >
            {loading === true ? (
              <div
                class="spinner-border"
                role="status"
                style={{ color: "white" }}
              >
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
