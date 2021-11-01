const mongoose = require("mongoose");
const { Comments } = require("../models/comments");
const { Newsletters } = require("../models/newsletter");
const { Account } = require("../models/account");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

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
  const { email } = req.body;
  console.log("Printing request body", req.body);
  console.log("This is email extracted from req.body", email);

  if (!email) {
    console.log("There is no email in body");
  } else {
    console.log("This is email from client", email);
  }

  const subscribedMails = await Newsletters.findOne({ email: email });
  // const accountsEmail = await Account.findOne({
  //   email: email,
  // });

  if (!subscribedMails) {
    const newsLetter = new Newsletters({
      email: email,
    });

    await newsLetter
      .save()
      .then((savedNewsletterEmail) => {
        if (savedNewsletterEmail) {
          console.log("Email has been saved");
        } else {
          console.log("Email has not been saved");
        }

        // Composing newsletter email
        const mailOptions = {
          to: email,
          from: "Eatsabyte",
          subject: "Newsletter Subscription",
          html: `<p>Dear user we appreciate your interest in our newsletter. We will keep you updated  - Eatsabyte</p>
        `,
        };

        // Sending email

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log("Could not send email", err);
          } else {
            console.log("Email send successfully");
            // res.json(info);
          }
        });

        return res.status(200).json({
          messgae: "Email sent successfully",
          email: mailOptions,
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
