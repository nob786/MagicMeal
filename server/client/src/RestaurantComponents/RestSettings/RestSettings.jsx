import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TitleTag from "../../Components/SpecialComp/TitleTag";
import QrGenerator from "../QrCodeGen/QrGen";
//==================Material Ui Imports=============================
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

//====================Redux Imports =============================//
import { useDispatch, useSelector } from "react-redux";

const RestSettings = () => {
  const { restData } = useSelector((state) => state.auth);
  const [val, setVal] = React.useState();

  const getChangeValue = (event) => {
    setVal(event.target.value);
    console.log("Switch Value", event.target.value);
  };

  console.log(restData._id);
  return (
    <div>
      <TitleTag title="Settings" />{" "}
      <Tabs
        style={{
          textAlign: "center",
          //   marginTop: "5%",
          marginBottom: "5%",
          marginRight: "5%",
          marginLeft: "5%",
          fontSize: "20px",
        }}
      >
        <TabList
          style={{
            backgroundColor: "#f3724c",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <Tab style={{ transitionDuration: "1.2s" }}>Profile Settings</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>Orders Settings</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>Reservation Settings</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>QR Code Generator</Tab>
        </TabList>

        <TabPanel>
          <h2></h2>
        </TabPanel>

        <TabPanel>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onClick={getChangeValue}
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              Default switch checkbox input
            </label>
          </div>
        </TabPanel>

        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>

        <TabPanel>
          <QrGenerator id={restData._id} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default RestSettings;
