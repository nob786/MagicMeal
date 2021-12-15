import { useEffect, useState } from "react";
import "./QrGen.css";

function QrGenerator({ id }) {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");

  // Changing the URL only when the user
  // changes the input
  useEffect(() => {
    setQrCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}`
    );
  }, [word, size, bgColor]);

  // Updating the input word when user
  // click on the generate button
  function handleClick() {
    setWord(id);
  }

  return (
    <div>
      <h1
        style={{
          color: "#fe724c",
          marginTop: "5%",
          marginBottom: "5%",
          fontSize: "30px",
        }}
      >
        QR Code Generator
      </h1>
      <div className="input-box">
        <div className="gen">
          {/* <input
            type="text"
            // onChange={(e) => {
            //   setTemp(e.target.value);
            // }}
            // placeholder="Enter text to encode"
            value={id}
          /> */}
          <input
            class="form-control form-control-lg w-50 form-center  qr-gen-field"
            type="text"
            placeholder=".form-control-lg"
            value={id}
          ></input>
          <button className="qr-gen-button" onClick={handleClick}>
            Generate
          </button>
        </div>
        <div>
          {/* <h5>Background Color:</h5>
          <input
            type="color"
            onChange={(e) => {
              setBgColor(e.target.value.substring(1));
            }}
          /> */}
          <h5>Dimension:</h5>
          <input
            type="range"
            min="200"
            max="600"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
        </div>
      </div>
      <br />
      <div>
        <img src={qrCode} alt="" />
        <a href={qrCode} download="QRCode">
          <button className="qr-gen-button" type="button">
            Download
          </button>
        </a>
      </div>
    </div>
  );
}

export default QrGenerator;
