import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "../PartenerImage/PartenerImage.css";

const PartenerImage = () => {
  return (
    <div class="partener-image">
      <div class="partener-container">
        <div className="partener-text">
          <h1>List your business on MagicMeal</h1>
          <p>
            Would you like thousands of new customers to taste your amazing
            food?
            <br /> So would we! It's simple: we list your menu online, help you
            process orders, pick them up, and deliver them to hungry foodies -
            in a heartbeat! Interested? <br /> Let's start our partnership
            today!
          </p>
          <div className="partener-button">
            <Link to="/restaurant-signup">
              <button className="partner-button">
                Become our Business Partner
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartenerImage;
