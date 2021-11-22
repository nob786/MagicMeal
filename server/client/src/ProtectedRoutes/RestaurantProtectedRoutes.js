/*============================================Importing React File===================================*/
import { Route, Redirect } from "react-router-dom";
import React from "react";
//==========================Redux imports===================================
import { useSelector } from "react-redux";

export const RestaurantProtectedRoutes = ({
  component: Component,
  ...rest
}) => {
  const { authRest } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authRest === true) return <Component {...props} />;
        else return <Redirect to="/notfound" />;
      }}
    />
  );
};
