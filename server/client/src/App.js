/*============================================Importing React File===================================*/
import React, { useEffect } from "react";
import axios from "axios";

/*==============================================Importing CSS Files===================================*/
import "./App.css"; /*App Css File*/

/*=============================================Importing Bootstrap CSS===============================*/
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//=============================================Importing Browser Router======================

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useLocation } from "react-router-dom";

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
import Restaurants from "./Components/OrderNow/Restaurants";
import Checkout from "./Components/Checkout/Checkout";
import UserMenuItems from "./Components/UserMenuItems/UserMenuItems";
import OrdersHistory from "./Components/UserOrders/OrdersHistory";
import MobileHeader from "./Components/MobileHeader/MobileHeader";
import UserProfile from "./Components/UserProfile/UserProfile";
import { CustomerProtectedRoutes } from "./ProtectedRoutes/CustomerProtectedRoutes";
import { RestaurantProtectedRoutes } from "./ProtectedRoutes/RestaurantProtectedRoutes";
import AdminMenuItems from "./RestaurantComponents/AdminPanel/AdminMenuItems";
import RestOrdersPending from "./RestaurantComponents/RestaurantOrders/RestOrdersPending";
import RestOrdersHistory from "./RestaurantComponents/RestaurantOrders/RestOrdersHistory";
import AdminHeader from "./RestaurantComponents/AdminHeader/AdminHeader";
import RestaurantProfile from "./RestaurantComponents/RestaurantProfile/RestaurantProfile";
import QrScanner from "./Components/QrScanner/QrScanner";
import RestMainPage from "./RestaurantComponents/RestMainPage/RestMainPage";
import RestSettings from "./RestaurantComponents/RestSettings/RestSettings";
import RestDineInOrders from "./RestaurantComponents/RestDineInOrders/RestDineInOrders";
import UserTableReservation from "./Components/UserTableReservations/UserRes";
import RestaurantTableReservation from "./RestaurantComponents/RestTableReservations/RestRes";

//=====================================Redux Imports=================================
import { useDispatch, useSelector } from "react-redux";
import { addRestaurantData } from "./Redux/actions/authentication";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function App() {
  const dispatch = useDispatch();
  const [screenSize, setScreenSize] = React.useState();

  //Auth
  const { authRest } = useSelector((state) => state.auth);

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
  function funcScreenSize() {
    setScreenSize(window.innerWidth);
    console.log("screen size", screenSize);
  }

  // useEffect(() => {
  //   if (authRest === true) {
  //     axios
  //       .get("/item/get-data", {
  //         headers: {
  //           authorization:
  //             localStorage.getItem("token") !== null
  //               ? JSON.parse(localStorage.getItem("token"))
  //               : null,
  //         },
  //       })
  //       .then((res) => {
  //         // toast.success("Got user redux app.js", {
  //         //   position: toast.POSITION.TOP_CENTER,
  //         //   autoClose: 2000,
  //         // });
  //         // restaurantData = res.data;
  //         // console.log("Response of appjs", res.data.restaurant);
  //         dispatch(addRestaurantData(res.data.restaurant));
  //       })
  //       .catch((err) => {
  //         // console.log("Error in FE", err.response.data.message);
  //         // toast.error("user not in redux app .js", {
  //         //   position: toast.POSITION.TOP_CENTER,
  //         //   autoClose: 2000,
  //         // });
  //       });
  //   }

  //   // funcScreenSize();
  // }, []);

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        {window.location.pathname.indexOf("/admin/") !== 0 ? (
          <Header />
        ) : window.location.pathname.indexOf("/admin/") === 0 ? (
          <AdminHeader />
        ) : null}
        {/* <Header/>  Header Section <Footer/> */}
        {/*<AdminAppBar/> {/* Admin bar Optional */}

        <Switch>
          {/* ============================Admin Page Routes================================== 
          <RestaurantProtectedRoutes
            path="/admin/dashboard"
            component={AdminMainPage}
          />*/}
          {/*============================Admin Restricted Orders Routers======================= */}

          <RestaurantProtectedRoutes
            exact
            path="/admin/table-reservations"
            component={RestaurantTableReservation}
          />

          <RestaurantProtectedRoutes
            exact
            path="/admin/orders-history"
            component={RestOrdersHistory}
          />
          <RestaurantProtectedRoutes
            exact
            path="/admin/orders"
            component={RestOrdersPending}
          />
          <RestaurantProtectedRoutes
            exact
            path="/admin/dinein-orders"
            component={RestDineInOrders}
          />
          <RestaurantProtectedRoutes
            exact
            path="/admin/profile"
            component={RestaurantProfile}
          />
          <RestaurantProtectedRoutes
            exact
            path="/admin/dashboard"
            component={RestMainPage}
          />
          <RestaurantProtectedRoutes
            exact
            path="/admin/settings"
            component={RestSettings}
          />

          {/*============================ Admin Testing Routers======================= */}

          <RestaurantProtectedRoutes
            exact
            path="/admin/menu-items"
            component={AdminMenuItems}
          />

          {/* ============================Globel Routes================================== */}
          <Route path="/restaurant-signup" component={RestaurantSignup} />
          <Route path="/foodie-login" component={FoodieLogin} />
          <Route path="/foodie-signup" component={FoodieSignup} />

          {/* ============================Restaurant and Order Pages================================== */}
          <Route exact path="/restaurants" component={Restaurants} />
          <Route exact path="/restaurants/:lat" component={Restaurants} />

          {/* ============================User Restricted Routes================================== */}
          <CustomerProtectedRoutes
            path="/user/table-reservations"
            component={UserTableReservation}
          />
          <CustomerProtectedRoutes
            path="/user/my-account"
            component={UserProfile}
          />
          <CustomerProtectedRoutes
            path="/user/orders-history"
            component={OrdersHistory}
          />
          {/* ============================User Not Restricted Routes================================== */}
          <Route path="/user-menu-items/:id" component={UserMenuItems} />
          <Route path="/dine-in/qrscanner" component={QrScanner} />

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
