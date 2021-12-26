import React, { Component } from "react";

const validate = (data) => {
  const errors = {};

  //============================User Signup Signup Specific Conditions=========================

  //FirstName
  if (data.firstName || data.firstName === "") {
    if (data.firstName === "") {
      errors.firstName = "FirstName is Required";
    } else if (data.firstName.length < 3) {
      errors.firstName = "FirstName cannot be less than 3 characters";
    } else if (data.firstName.length > 15) {
      errors.firstName = "FirstName cannot exceeds 15 characters";
    } else if (data.firstName.includes(" ")) {
      errors.firstName = "FirstName cannot contains spaces";
    }
  }
  //LasttName
  if (data.lastName || data.lastName === "") {
    if (data.lastName === "") {
      errors.lastName = "LastName is Required";
    } else if (data.lastName.length < 3) {
      errors.lastName = "LastName cannot be less than 3 characters";
    } else if (data.lastName.length > 15) {
      errors.lastName = "LastName cannot exceeds 15 characters";
    } else if (data.lastName.includes(" ")) {
      errors.lastName = "LastName cannot contains spaces";
    }
  }

  //OwnerName
  if (data.OwnerName || data.OwnerName === "") {
    if (data.OwnerName === "") {
      errors.OwnerName = "Owner Name is Required";
    } else if (
      !/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(data.OwnerName)
    ) {
      errors.OwnerName = "Please Use Proper Name Format";
    } else if (data.OwnerName.length < 3) {
      errors.OwnerName = "Owner Name cannot be less than 3 characters";
    } else if (data.OwnerName.length > 20) {
      errors.OwnerName = "OwnerName cannot exceeds 20 characters";
    }
    //  else if (data.OwnerName.includes(" ")) {
    //   errors.OwnerName = "OwnerName cannot contains spaces";
    // }
  }
  //RestaurantName
  if (data.restaurantName || data.restaurantName === "") {
    if (data.restaurantName === "") {
      errors.restaurantName = "Restaurant Name is Required";
    } else if (
      !/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(data.restaurantName)
    ) {
      errors.restaurantName = "Please Use Proper Name Format";
    } else if (data.restaurantName.length < 3) {
      errors.restaurantName =
        "Restaurant Name cannot be less than 3 characters";
    } else if (data.restaurantName.length > 15) {
      errors.restaurantName = "Restaurant Name cannot exceeds 15 characters";
    }
    // else if (data.restaurantName.includes(" ")) {
    //   errors.restaurantName = "Restaurant Name cannot contains spaces";
    // }
  }

  //RestaurantLocation
  if (data.restaurantLocation || data.restaurantLocation === "") {
    if (data.restaurantLocation === "") {
      errors.restaurantLocation = "Please Select Restaurant Location";
    }
    //  else if (data.restaurantLocation.length < 3) {
    //   errors.restaurantLocation =
    //     "Restaurant Location cannot be less than 3 characters";
    // } else if (data.restaurantLocation.length > 15) {
    //   errors.restaurantLocation =
    //     "Restaurant Location cannot exceeds 15 characters";
    // } else if (data.restaurantLocation.includes(" ")) {
    //   errors.restaurantLocation = "Restaurant Location cannot contains spaces";
    // }
  }
  //Category Restaurant
  if (data.category || data.category === "") {
    if (data.category === "") {
      errors.category = "Please Select Required Category";
    }
  }

  //Contact
  if (data.contact || data.contact === "") {
    if (data.contact === "") {
      errors.contact = "Mobile Number is Required";
    } else if (!/^[0]{1}[0-9]{10}$/.test(data.contact)) {
      errors.contact = "Invalid Mobile Format. Should be 03XXYYYYYYY";
    }
    // else if (data.contact.length !== 11) {
    //   errors.contact = "Mobile Number should contains 11 Digits";
    // }
  }

  //==================================Combined Conditions

  if (!data.email) {
    errors.email = "Email is Required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid Email Format";
  }

  if (!data.password) {
    errors.password = "Password is Required";
  } else if (data.password.length < 4) {
    errors.password = "Password cannot be less tha 4 characters";
  } else if (data.password.length > 11) {
    errors.password = "Password cannot exceed 11 characters";
  } else if (data.password.includes(" ")) {
    errors.password = "Password cannot contains spaces";
  }

  return errors;
};

export default validate;
