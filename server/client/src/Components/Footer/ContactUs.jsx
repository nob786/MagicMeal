import React from "react";
import TitleTag from "../SpecialComp/TitleTag";
import "../Footer/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <TitleTag title="CONTACT US" />
      <p>
        Our Customer Service Team is available to take your calls.
        <br />
        TIMINGS Monday to Saturday (9 A.M to 5 P.M) Lunch/Prayer Break: 1:00 pm
        to 2:00pm Friday Lunch/Prayer Break: 1:00 to 3:00 pm
        <br />
        Call / WhatsApp at:{" "}
        <span style={{ fontWeight: "bold" }}>+92 301 4980779</span>
        <br />
        EMAIL US:{" "}
        <span style={{ fontWeight: "bold" }}>{window.name}@gmail.com</span>
        <br />
        Our Customer Service Team will review and respond to your query as
        quickly as possible.
      </p>
    </div>
  );
};

export default ContactUs;
