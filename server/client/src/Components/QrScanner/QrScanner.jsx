import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";

import "./QrScanner.css";
//=========================Other Imports=========================
import QrReader from "react-qr-reader";
const QrScanner = () => {
  const [result, setResult] = React.useState();
  const history = useHistory();
  //===Handle Qr Scanner
  const handleScan = (data) => {
    if (data) {
      setResult(data);
      // console.log("Qr Res")
      history.push(`/user-menu-items/${data}`);
    }
  };
  const handleError = (err) => {
    console.log(err);
  };
  return (
    <div className="qr-scanner">
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>{result}</p>
    </div>
  );
};

export default QrScanner;
