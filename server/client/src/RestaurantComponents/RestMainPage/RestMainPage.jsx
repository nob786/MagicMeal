import React, { Component } from "react";
import Chart from "react-google-charts";
import TitleTag from "../../Components/SpecialComp/TitleTag";

const RestMainPage = () => {
  return (
    <div>
      {/* <button
        className="btn btn-info"
        style={{
          color: "black",
          marginTop: "1%",
          marginBottom: "1%",
          marginLeft: "1%",
          marginRight: "1%",
          textAlign: "right",
        }}
        onClick={this.openFrame.bind(null, print_content)}
      >
        Generate Invoice
      </button> */}
      <TitleTag title="Dashboard" />
      <Chart
        style={{ margin: "auto" }}
        width={"90%"}
        height={"400px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["x", "dogs"],
          ["2021 - 1 - 11", 0],
          ["2021 - 1 - 11", 10],
          ["2021 - 1 - 11", 23],
          ["2021 - 1 - 11", 17],
          ["2021 - 1 - 11", 18],
          ["2021 - 1 - 11", 9],
          ["2021 - 1 - 11", 11],
          ["2021 - 1 - 11", 27],
          ["2021 - 1 - 11", 33],
          ["2021 - 1 - 11", 40],
          ["2021 - 1 - 11", 32],
          ["2021 - 1 - 11", 35],
        ]}
        options={{
          hAxis: {
            title: "Date",
          },
          vAxis: {
            title: "Sales",
          },
        }}
        rootProps={{ "data-testid": "1" }}
      />
      <div>
        <Chart
          width={"90%"}
          height={300}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["City", "2010 Population", "2000 Population"],
            ["New York City, NY", 8175000, 8008000],
            ["Los Angeles, CA", 3792000, 3694000],
            ["Chicago, IL", 2695000, 2896000],
            ["Houston, TX", 2099000, 1953000],
            ["Philadelphia, PA", 1526000, 1517000],
          ]}
          options={{
            title: "Population of Largest U.S. Cities",
            chartArea: { width: "30%" },
            hAxis: {
              title: "Total Population",
              minValue: 0,
            },
            vAxis: {
              title: "City",
            },
          }}
          legendToggle
        />
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Year", "Sales", "Expenses"],
            ["2013", 1000, 400],
            ["2014", 1170, 460],
            ["2015", 660, 1120],
            ["2016", 1030, 540],
          ]}
          options={{
            title: "Company Performance",
            hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
            vAxis: { minValue: 0 },
            // For the legend to fit, we make the chart area smaller
            chartArea: { width: "50%", height: "70%" },
            // lineWidth: 25
          }}
        />
      </div>
      <div>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="BubbleChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["ID", "Life Expectancy", "Fertility Rate", "Region", "Population"],
            ["CAN", 80.66, 1.67, "North America", 33739900],
            ["DEU", 79.84, 1.36, "Europe", 81902307],
            ["DNK", 78.6, 1.84, "Europe", 5523095],
            ["EGY", 72.73, 2.78, "Middle East", 79716203],
            ["GBR", 80.05, 2, "Europe", 61801570],
            ["IRN", 72.49, 1.7, "Middle East", 73137148],
            ["IRQ", 68.09, 4.77, "Middle East", 31090763],
            ["ISR", 81.55, 2.96, "Middle East", 7485600],
            ["RUS", 68.6, 1.54, "Europe", 141850000],
            ["USA", 78.09, 2.05, "North America", 307007000],
          ]}
          options={{
            title:
              "Correlation between life expectancy, fertility rate " +
              "and population of some world countries (2010)",
            hAxis: { title: "Life Expectancy" },
            vAxis: { title: "Fertility Rate" },
            bubble: { textStyle: { fontSize: 11 } },
          }}
        />
        <Chart
          width={"100%"}
          height={300}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            [
              { type: "number", label: "x" },
              { type: "number", label: "values" },
              { id: "i0", type: "number", role: "interval" },
              { id: "i1", type: "number", role: "interval" },
              { id: "i2", type: "number", role: "interval" },
              { id: "i2", type: "number", role: "interval" },
              { id: "i2", type: "number", role: "interval" },
              { id: "i2", type: "number", role: "interval" },
            ],
            [1, 100, 90, 110, 85, 96, 104, 120],
            [2, 120, 95, 130, 90, 113, 124, 140],
            [3, 130, 105, 140, 100, 117, 133, 139],
            [4, 90, 85, 95, 85, 88, 92, 95],
            [5, 70, 74, 63, 67, 69, 70, 72],
            [6, 30, 39, 22, 21, 28, 34, 40],
            [7, 80, 77, 83, 70, 77, 85, 90],
            [8, 100, 90, 110, 85, 95, 102, 110],
          ]}
          options={{
            intervals: { style: "sticks" },
            legend: "none",
          }}
        />
      </div>
    </div>
  );
};

export default RestMainPage;
