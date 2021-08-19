/*============================================Importing React File===================================*/
import React, { Component , useEffect} from "react";

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

//=================================Importing Components================================//
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import RestaurantLogin from "./Components/Login/RestaurantLogin";
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
import AdminMenuItems from "./Components/AdminPanel/AdminMenuItems";
import AdminMainPage from "./Components/AdminPanel/AdminMainPage";
import Restaurants from "./Components/OrderNow/Restaurants";
import MenuItems from "./Components/OrderNow/MenuItems";
import NewMenuItem from "./Components/AdminPanel/NewMenuItem";
import Checkout from "./Components/Checkout/Checkout";
import UserMenuItems from "./Components/UserMenuItems/UserMenuItems";
import { Provider } from "react-redux";
import store from "./Redux/store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  componentWillMount() {
    this.callAPI();
  }

  showOff(){
    if (window.location.pathname==="./foodie-login")
    return null;
    else
    return
    <Header />;
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  state = {
    visible: true,
  };
  

  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <ScrollToTop />
          {window.location.pathname==="/foodie-login" || window.location.pathname==="/foodie-signup" ? null : <Header/>}
          <p>{this.state.apiResponse}</p>

          {/* <Header/>  Header Section <Footer/> */}
          {/*<AdminAppBar/> {/* Admin bar Optional */}

          <Switch>
            {/* ============================Admin Page Routes================================== */}
            <Route path="/admin/dashboard" component={AdminMainPage} />
            <Route path="/admin/new-menu" component={NewMenuItem} />

            <Route path="/restaurant-login" component={RestaurantLogin} />
            <Route path="/restaurant-signup" component={RestaurantSignup} />
            <Route path="/foodie-login" component={FoodieLogin} />
            <Route path="/foodie-signup" component={FoodieSignup} />

            {/* ============================Restaurant and Order Pages================================== */}

            <Route path="/restaurants" component={Restaurants} />
            <Route path="/menu-items" component={MenuItems} />
            <Route path="/user-menu-items" component={UserMenuItems} />

            {/*============================Testing Routers======================= */}

            <Route path="/admin/menu-items" component={AdminMenuItems} />

            <Route path="/complaint-form" component={ComplaintForm} />
            <Route path="/FAQs" component={FAQ} />

            <Route path="/about-us" component={AboutUs} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />

            <Route path="/" exact component={MainPage} />

            <Route path="/checkout" component={Checkout} />
            <Route path="/*" component={NotFound} />

            {/* ============================Admin Page Routes================================== */}
          </Switch>
          {window.location.pathname==="/foodie-login" || window.location.pathname==="/foodie-signup" ? null : <Footer />}
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
