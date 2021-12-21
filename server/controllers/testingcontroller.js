const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
require("dotenv").config();
const client = require("twilio")(accountSid, authToken);

exports.testMsg = async (req, res) => {
  console.log("API Called");
  client.messages
    .create({
      body: "Fuck you shameer masood",
      from: "+1 863 265 4298",
      to: "+923014980779",
    })
    .then((message) => console.log("Message", message.sid))
    .catch((err) => console.log("Error", err));
};

exports.verifyNumber = async (req, res) => {
  console.log("Inside verify Number API");
  client.outgoingCallerIds
    .list({ phoneNumber: "+923227189188", limit: 20 })
    .then((outgoingCallerIds) => {
      console.log("Inside client");
      outgoingCallerIds.forEach((o) => console.log(o.sid));
    })
    .catch((err) => {
      if (err) {
        console.log("This is error", err);
      } else {
        console.log("yolo");
      }
    });
  // client.validationRequests
  //   .create({
  //     friendlyName: "My Home Phone Number",
  //     phoneNumber: "+923227189188",
  //   })
  //   .then((validation_request) => console.log(validation_request.friendlyName))
  //   .catch((err) => {
  //     if (err) {
  //       console.log("This is error", err);
  //     }
  //   });
};
