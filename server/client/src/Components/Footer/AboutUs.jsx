import React from "react";
import TitleTag from "../SpecialComp/TitleTag";
import "../Footer/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <TitleTag title="ABOUT US" />

      <p>
        Eatsabye is new trending food ordering platform. Eastsabyte is a Startup
        by three students of COMSATS University Lahore, Pakistan. <br />{" "}
        Eatsabyte aim is to provide hassle free Take-away, Table Booking and
        Dine-in orders' services to our customers. <br /> Now feel free to
        dine-in without the hassle of calling the waiter and waiting to get ur
        turn.
      </p>
    </div>
  );
};

export default AboutUs;
