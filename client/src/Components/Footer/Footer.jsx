import React from 'react';
import {Link} from "react-router-dom";
import '../Footer/Footer.css'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    const location = useLocation();


    return (
        location.pathname === "/foodie-signup"|| location.pathname === "/checkout"|| location.pathname ==="/foodie-login"   ?
         null: <div className="Footer">

            <div className="Footer-b">
            <div className="footer-child">
                
                <h1> About Us</h1>
                    <li><Link className="a" style= {{textDecoration: 'none'} } to= "/about-us">About Us</Link></li>
                    <li><Link className="a" style= {{textDecoration: 'none'} } to= "/contact-us">Contact Us</Link></li>
                    <li><Link className="a" style= {{textDecoration: 'none'} } to= "/privacy-policy">Privacy Policy</Link></li>
            
            </div>

            <div className="footer-child">
                    <h1>Customer Care</h1>
                    <li><Link className="a" style= {{textDecoration: 'none'} } to= "/complaint-form">Complaint Form</Link></li>
                    <li><Link className="a" style= {{textDecoration: 'none'} } to= "/FAQs">FAQ's</Link></li>
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
                        <a className="follow-icon-link" href="https://www.facebook.com/shameer.masood.98" target="_blank"> <i class="fab fa-facebook fa-2x"></i></a>
                        <a className="follow-icon-link" href="https://www.instagram.com/" target="_blank"> <i class="fab fa-instagram fa-2x"></i> </a>
                    </li>
            </div>
            </div>

            <div className="footer-bottom-mark">
                <h1>MagicMeal.inc</h1>
            </div>

        </div>
    );
}
 
export default Footer;