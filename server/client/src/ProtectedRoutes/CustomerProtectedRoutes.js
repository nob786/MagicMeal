/*============================================Importing React File===================================*/
import { Route, Redirect } from "react-router-dom";
import React from "react";
//==========================Redux imports===================================
import { useSelector } from "react-redux";

export const CustomerProtectedRoutes = ({ component: Component, ...rest }) => {
  const { authCust } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authCust === true) return <Component {...props} />;
        else return <Redirect to="/notfound" />;
      }}
    />
  );
};
