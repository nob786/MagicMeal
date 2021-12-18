const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
require("dotenv").config();
const client = require("twilio")(accountSid, authToken);

exports.testMsg = async (req, res) => {
  console.log("API Called");
  client.messages
    .create({
      body: "Hello from me",
      from: "+1 863 265 4298",
      to: "+923237989896",
    })
    .then((message) => console.log("Message", message.sid))
    .catch((err) => console.log("Error", err));
};

exports.verifyNumber = async (req, res) => {
  console.log("Inside verify Number API");
  client.validationRequests
    .create({
      friendlyName: "My Home Phone Number",
      phoneNumber: "+923227189188",
    })
    .then((validation_request) => console.log(validation_request.friendlyName))
    .catch((err) => {
      if (err) {
        console.log("This is error", err);
      }
    });
};
