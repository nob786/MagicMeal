import React from "react";
import axios from "../../../axios";
import Button from "../Button/Button";
import "./NewsLetter.css";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const NewsLetter = () => {
  const [email, setEmail] = React.useState();

  const subscribeNewsletter = () => {
    axios
      .post("/public/subscribe-to-newsletter", { email })
      .then((res) => {
        //console.log("Subscription data", res.data.message);
        if (res.data.message)
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        else {
          toast.success("Successfully Subscribed", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        // console.log("error", err._message);
        toast.error("Validation Error", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
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
        </div>

        <div className="subscribe_button">
          <button
            className="newsletter-submit-button"
            onClick={subscribeNewsletter}
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
