import React from "react";
import { Link } from "react-router-dom";
import "../Footer/Footer.css";
import { useLocation } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const location = useLocation();

  return location.pathname === "/checkout" ? null : (
    <div className="Footer">
      <div className="Footer-b">
        <div className="footer-child">
          <h1> About Us</h1>
          <li>
            <Link className="a" to="/about-us">
              About Us
            </Link>
          </li>
          <li>
            <Link className="a" to="/contact-us">
              Contact Us
            </Link>
          </li>
          <li>
            <Link className="a" to="/privacy-policy">
              Privacy Policy
            </Link>
          </li>
        </div>

        <div className="footer-child">
          <h1>Customer Care</h1>
          <li>
            <Link className="a" to="/complaint-form">
              Complaint Form
            </Link>
          </li>
          <li>
            <Link className="a" to="/FAQs">
              FAQ's
            </Link>
          </li>
        </div>

        <div className="footer-child follow-us">
          <h1>Payment Partners</h1>
          <li>
            <i class="fab fa-cc-mastercard fa-3x"></i>
            <i class="fab fa-cc-visa fa-3x"></i>
          </li>
        </div>

        <div className="footer-child follow-us">
          <h1>Follow Us</h1>
          <li>
            <a
              className="follow-icon-link"
              style={{ marginRight: "2%" }}
              href="https://www.facebook.com/Eatsabyte-108799371597294/?ref=page_internal"
              target="_blank"
            >
              {" "}
              <i class="fab fa-facebook fa-2x"></i>
            </a>
            <a
              className="follow-icon-link"
              href="https://www.linkedin.com/company/eatsabyte/"
              target="_blank"
            >
              {" "}
              <i class="fab fa-linkedin fa-2x"></i>{" "}
            </a>
          </li>
        </div>
      </div>

      <div className="footer-bottom-mark">
        <h1>MagicMeal.inc</h1>
      </div>
    </div>
  );
};

export default Footer;
