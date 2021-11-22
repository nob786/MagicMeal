/*============================================Importing React File===================================*/
import React, { Component, useEffect } from "react";

/*==============================================Importing CSS Files===================================*/
import "./App.css"; /*App Css File*/

/*=============================================Importing Bootstrap CSS===============================*/
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//=============================================Importing Browser Router======================

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useLocation } from "react-router-dom";

//=================================Importing Components================================//
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import NotFound from "./Components/SpecialComp/NotFound";
import PrivacyPolicy from "./Components/Footer/PrivacyPolicy";
import ContactUs from "./Components/Footer/ContactUs";
import AboutUs from "./Components/Footer/AboutUs";
import ScrollToTop from "./Components/SpecialComp/ScrollToTop";
import MainPage from "./Components/MainPage/MainPage";
import RestaurantSignup from "./Components/Signup/RestaurantSignup";
import FoodieLogin from "./Components/Login/FoodieLogin";
import FoodieSignup from "./Components/Signup/FoodieSignup";
import ComplaintForm from "./Components/Footer/ComplaintForm";
import FAQ from "./Components/Footer/FAQ";
import AdminMainPage from "./RestaurantComponents/AdminPanel/AdminMainPage";
import Restaurants from "./Components/OrderNow/Restaurants";
import Checkout from "./Components/Checkout/Checkout";
import UserMenuItems from "./Components/UserMenuItems/UserMenuItems";
import OrdersHistory from "./Components/UserOrders/OrdersHistory";
import MobileHeader from "./Components/MobileHeader/MobileHeader";
import UserProfile from "./Components/UserProfile/UserProfile";
import { CustomerProtectedRoutes } from "./ProtectedRoutes/CustomerProtectedRoutes";
import { RestaurantProtectedRoutes } from "./ProtectedRoutes/RestaurantProtectedRoutes";

function App() {
  /*componentWillMount() {
    this.callAPI();
  }

  callAPI() {
    fetch("http://localhost:3000/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  state = {
    visible: true,
  };*/

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        {window.innerWidth > 970 &&
        window.location.pathname.indexOf("/admin/") != 0 ? (
          <Header />
        ) : window.innerWidth <= 970 &&
          window.location.pathname.indexOf("/admin/") != 0 ? (
          <MobileHeader />
        ) : window.innerWidth > 970 &&
          window.location.pathname.indexOf("/admin/") == 0 ? (
          <AdminMainPage />
        ) : null}
        {/* <Header/>  Header Section <Footer/> */}
        {/*<AdminAppBar/> {/* Admin bar Optional */}

        <Switch>
          {/* ============================Admin Page Routes================================== */}
          <RestaurantProtectedRoutes
            path="/admin/dashboard"
            component={AdminMainPage}
          />

          {/* ============================Globel Routes================================== */}
          <Route path="/restaurant-signup" component={RestaurantSignup} />
          <Route path="/foodie-login" component={FoodieLogin} />
          <Route path="/foodie-signup" component={FoodieSignup} />

          {/* ============================Restaurant and Order Pages================================== */}

          <Route path="/restaurants" component={Restaurants} />

          {/* ============================User Restricted Routes================================== */}
          <CustomerProtectedRoutes
            path="/user/my-account"
            component={UserProfile}
          />
          <CustomerProtectedRoutes
            path="/user/orders-history"
            component={OrdersHistory}
          />
          {/* ============================User Not Restricted Routes================================== */}
          <Route path="/user-menu-items" component={UserMenuItems} />

          {/*============================Testing Routers======================= */}

          <Route path="/complaint-form" component={ComplaintForm} />
          <Route path="/FAQs" component={FAQ} />

          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />

          <Route path="/" exact component={MainPage} />

          {/* ============================User Restriced Routes================================== */}
          <CustomerProtectedRoutes path="/checkout" component={Checkout} />

          <Route path="/*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
