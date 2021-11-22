const mongoose = require("mongoose");
const { Comments } = require("../models/comments");
const { Newsletters } = require("../models/newsletter");
const { Account } = require("../models/account");
const nodemailer = require("nodemailer");
require("dotenv").config();
const mailgun = require("mailgun-js");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
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
  await emailTransporter.sendMail(mailOptions);
};

exports.getComments = async (req, res) => {
  try {
    const comment = await Comments.find();

    if (!restaurants) return res.status(404).send("No restaurant found.");
    return res.status(200).json({
      message: "These are all the restaurants in database.",
      data: restaurants,
    });
  } catch (error) {
    if (error)
      return res.status(500).json({
        message: "Server Error",
        error: error,
      });
  }
};

exports.subscribeForNewsletter = async (req, res) => {
  console.log("Subscribe Api called");
  console.log("This is my user", process.env.GMAIL_USER);
  console.log("This is my user", process.env.GMAIL_PASS);
  let { email } = req.body;
  console.log("email" + email);
  // const receivedEmail = email
  console.log("Printing request body", req.body);

  if (!email) {
    console.log("There is no email in body");
  } else {
    console.log("This is email from client", email);
  }

  const accountsEmail = await Account.findOne({
    email: email,
  });

  if (!accountsEmail) {
    const newsLetter = new Newsletters({
      email: email,
    });

    await newsLetter
      .save()
      .then((savedNewsletterEmail) => {
        if (!savedNewsletterEmail) {
          console.log("This is the email we saved", savedNewsletterEmail);
          // return res.status(400).json({
          //   messgae: "Could not save email",
          // });
        } else {
          console.log(
            "Email saved to newsletter collection",
            savedNewsletterEmail
          );
        }
        const mailOptions = {
          to: email,
          from: "Eatsabyte@gmail.com",
          subject: "Newsletter Subscription",
          html: `<p>Dear user we appreciate your interest in our newsletter. We will keep you updated  - Eatsabyte</p>
          `,
        };
        sendEmail(mailOptions);
        // transporter.sendMail(mailOptions, function (err, info) {
        //   if (err) {
        //     console.log("Could not send email", err);
        //   } else {
        //     console.log("Email send successfully");
        //     // res.json(info);
        //   }
        // });

        return res.status(200).json({
          messgae: "Email send successfully",
          // email: mailOptions,
        });
      })
      .catch((error) => {
        if (!error) {
          console.log("Internal server Error", error);
          return res.status(500).json({
            message: "Internal Server Error",
          });
        } else {
          console.log("There wa an error in catch", error);
          return res.status(400).json({
            messgae: "There was an error in catch block",
            error: error,
          });
        }
      });
  } else {
    console.log("You are already registerd and will get updated newsletters");
    return res.status(200).json({
      message: "Your email is already registered for our newsletter",
      data: email,
    });
  }
};
