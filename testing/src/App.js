import "./App.css";
import {
  LogIn,
  SignUp,
  RestaurantSignUp,
  AddMenuForm,
  MenuCard,
  Menus,
  NavBar,
  ViewMenuCard,
} from "./components";
import {
  Home,
  MenuPage,
  About,
  Contact,
  CustomerFeedPage,
  ViewMenus,
} from "./pages";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <div className="App">
            <NavBar />
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/contact">
              <Contact />
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/signup">
              <SignUp />
            </Route>

            <Route path="/login">
              <LogIn />
            </Route>

            <Route path="/menus">
              <MenuPage />
            </Route>

            <Route path="/customer/feed">
              <CustomerFeedPage />
            </Route>

            <Route path="/restaurant-signup">
              <RestaurantSignUp />
            </Route>

            <Route path="/view-menus">
              <ViewMenuCard />
            </Route>
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
