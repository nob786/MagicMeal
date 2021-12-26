const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Customer } = require("../models/customer");
const { Account } = require("../models/account");
const { Restaurant } = require("../models/restaurant");
const { validateEmail } = require("../middleware/validation");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  // console.log("This is oauth2Client before setting credentials", oauth2Client);

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  // console.log("This is oauth2Client after setting credentials", oauth2Client);

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to crete access token");
        console.log("Error in promise");
        console.log("Token", token);
      }
      resolve(token);
    });
  });

  // console.log("Access Token", accessToken);

  const transporter = nodemailer.createTransport({
    // host: process.env.SMTP_URL,
    // port: 587,
    // secure: "false",
    // auth: {
    //   user: process.env.SMTP_USER,
    //   pass: process.env.SMTP_PASS,
    // },
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,

      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  return transporter;
};

const sendEmail = async (mailOptions) => {
  let emailTransporter = await createTransporter();
  // console.log("Email Transporter", emailTransporter);
  await emailTransporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(`mail sent ${info.response}`);
    }
  });
};

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
exports.resetPassword = async (req, res) => {
  console.log("Inside reset password API");

  const { email } = req.body;
  const { error } = validateEmail(req.body);

  if (error) {
    console.log("Enter email in correct format", error);

    return res.json({
      message: "Enter email in correct format",
    });
  }

  Account.findOne({ email: email })
    .then(async (account) => {
      let randomPassword = crypto.randomBytes(5).toString("hex");
      console.log("My new password", randomPassword);

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);
      console.log("New Hashed password", hashedPassword);
      const mailOptions = {
        to: email,
        from: "Magic Meal",
        subject: "Your new password",
        html: `<p>Your new password is ${randomPassword}. Use it to login to your account</p>`,
      };

      account.password = hashedPassword;
      console.log("About to reset password");
      account.save();
      console.log("Passowrd reset successful");
      console.log("New account object", account);
      sendEmail(mailOptions);
      return res.status(200).json({
        message: "Password reset successful",
      });
    })
    .catch((error) => {
      if (error) {
        console.log("Error in catch block");
        return res.json({ message: "Something went wrong", error: error });
      } else {
        return res.json({
          message: "Internal server error",
        });
      }
    });
};
