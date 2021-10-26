/*============================================Importing React File===================================*/
import React, { Component , useEffect} from "react";

/*==============================================Importing CSS Files===================================*/


//=============================================Importing Browser Router======================
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ScrollToTop from "../../Components/SpecialComp/ScrollToTop";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminMenuItems from "./AdminMenuItems";
import ComplaintForm from "../../Components/Footer/ComplaintForm";
import FAQ from "../../Components/Footer/FAQ";
import AboutUs from "../../Components/Footer/AboutUs";
import ContactUs from "../../Components/Footer/ContactUs";
import PrivacyPolicy from "../../Components/Footer/PrivacyPolicy";
import MainPage from "../../Components/MainPage/MainPage";
import Checkout from "../../Components/Checkout/Checkout";
import NotFound from "../../Components/SpecialComp/NotFound";
import FormDialog from "./NewMenuItem";
import MenuItems from "../../Components/OrderNow/MenuItems";
import RestOrdersHistory from "../RestaurantOrders/RestOrdersHistory";
import RestOrdersPending from "../RestaurantOrders/RestOrdersPending";

//=================================Importing Components================================//



class AdminMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  

  /*componentWillMount() {
    this.callAPI();
  }



  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }*/

  state = {
    visible: true,
  };
  

  render(){ 
    return (
      <Router>
        <div className="App">
          <ScrollToTop />
          <AdminHeader/>

          {/* <Header/>  Header Section <Footer/> */}
          {/*<AdminAppBar/> {/* Admin bar Optional */}

          <Switch>
            {/* ============================Admin Page Routes================================== */}

            {/*============================Orders Routers======================= */}

            <Route path="/admin/orders-history" component={RestOrdersHistory} />
            <Route path="/admin/orders-pending" component={RestOrdersPending} />

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
        </div>
      </Router>
    );
  }
}

export default AdminMainPage;
