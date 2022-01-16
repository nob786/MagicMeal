import React, { Component } from "react";
import Chart from "react-google-charts";
import TitleTag from "../../Components/SpecialComp/TitleTag";

import "./RestMainPage.css";

const RestMainPage = () => {
  return (
    <div>
      <TitleTag title="Dashboard" />
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <div class="card-counter primary">
              <i class="fa fa-code-fork"></i>
              <span class="count-numbers">12</span>
              <span class="count-name">Total Orders: 777</span>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card-counter danger">
              <i class="fa fa-ticket"></i>
              <span class="count-numbers">599</span>
              <span class="count-name">Satisfied Customers:</span>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card-counter success">
              <i class="fa fa-database"></i>
              <span class="count-numbers">6875</span>
              <span class="count-name">Total Reservations:</span>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card-counter info">
              <i class="fa fa-users"></i>
              <span class="count-numbers">35</span>
              <span class="count-name">Total Menus</span>
            </div>
          </div>
        </div>
      </div>
      <Chart
        style={{ margin: "auto", marginBottom: "10%" }}
        width={"100%"}
        height={"400px"}
        chartType="LineChart"
        loader={
          <div class="spinner-grow" role="status" style={{ color: "#f3724c" }}>
            <span class="sr-only">Loading...</span>
          </div>
        }
        data={[
          ["x", "sales"],
          ["JAN", 0],
          ["JAN", 10000],
          ["FEB", 0],
          ["MAR", 0],
          ["APR", 0],
          ["MAY", 0],
          ["JUN", 0],
          ["JUL", 0],
          ["AUG", 0],
          ["SEP", 15000],
          ["OCT", 32000],
          ["NOV", 35000],
          ["DEC", 35000],
        ]}
        options={{
          hAxis: {
            title: "Date",
          },
          vAxis: {
            title: "Sales",
          },
          viewWindow: { min: 0, max: 400 },
        }}
        rootProps={{ "data-testid": "1" }}
      />
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            {" "}
            <Chart
              // width={"100%"}
              height={300}
              chartType="PieChart"
              loader={
                <div
                  class="spinner-grow"
                  role="status"
                  style={{ color: "#f3724c" }}
                >
                  <span class="sr-only">Loading...</span>
                </div>
              }
              data={[
                ["Feedbacks", "Weight"],
                ["Positive Feedbacks", 12],
                ["Negative Feedback", 7],
              ]}
              options={{
                intervals: { style: "sticks" },
                legend: "none",
                slices: [
                  {
                    color: "#2BB673",
                  },
                  {
                    color: "#d91e48",
                  },
                  {
                    color: "#007fad",
                  },
                  {
                    color: "#e9a227",
                  },
                ],
              }}
            />
          </div>
          <div class="col-md-5">
            <div className="restaurant-sections">
              <div id="section1" class="container-fluid">
                <h1>Section 1</h1>
                <p>Try to scroll this section and look at the navigation bar</p>
                <p>Try to scroll this section and look at the navigation bar</p>
              </div>
              <div id="section2" class="container-fluid">
                <h1>Section 2</h1>
                <p>Try to scroll this section and look at the navigation bar</p>
                <p>Try to scroll this section and look at the navigation bar</p>
              </div>
              <div id="section3" class="container-fluid">
                <h1>Section 3</h1>
                <p>Try to scroll this section and look at the navigation bar</p>
                <p>Try to scroll this section and look at the navigation bar</p>
              </div>
              <div id="section41" class="container-fluid">
                <h1>Section 4 Submenu 1</h1>
                <p>Try to scroll this section and look at the navigation bar</p>
                <p>Try to scroll this section and look at the navigation bar</p>
              </div>
              <div id="section42" class="container-fluid">
                <h1>Section 4 Submenu 2</h1>
                <p>Try to scroll this section and look at the navigation bar</p>
                <p>Try to scroll this section and look at the navigation bar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestMainPage;
