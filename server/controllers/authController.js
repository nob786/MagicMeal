const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Customer } = require("../models/customer");
const { Account } = require("../models/account");
const { Restaurant } = require("../models/restaurant");
const {
  validateUser,
  validateRestaurant,
  validateLogin,
} = require("../middleware/validation");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.login = async (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) return res.status(400).send("Enter data in correct form.");

  const { email, password } = req.body;

  const loadedAccount = await Account.findOne({
    email: email,
  });

  if (!loadedAccount) return res.status(404).send("Account not found");

  let hashedPassword = await bcrypt.compare(password, loadedAccount.password);

  if (!hashedPassword) return res.status(404).send("Invalid Email or password");

  const token = jwt.sign({ accountId: loadedAccount._id.toString() }, "myKey");

  const loadedCustomer = await Customer.findOne({
    account: loadedAccount._id,
  });

  const loadedRestaurant = await Restaurant.findOne({
    account: loadedAccount._id,
  });

  if (!token) {
    return res.status(400).json({
      message: "Token is empty",
      data: token,
    });
  }

  if (loadedAccount.isVerified !== true) {
    console.log("Account is not verified");
    return res.status(401).json({
      message: "Verify email",
    });
  } else {
    console.log("In else statement checking role of user.");
    if (loadedAccount.role === "restaurant") {
      return res.status(200).json({
        token: token,
        role: loadedAccount.role,
        id: loadedAccount._id,
        restaurant: loadedRestaurant,
      });
    } else if (loadedAccount.role === "customer") {
      return res.status(200).json({
        token: token,
        role: loadedAccount.role,
        id: loadedAccount._id,
        customer: loadedCustomer,
      });
    }
  }
};

exports.signupRestaurant = async (req, res) => {
  const { error } = validateRestaurant(req.body);

  if (error) return res.status(400).send("Enter data correctly");

  const {
    ownerName,
    restaurantName,
    contact,
    category,
    address,
    email,
    password,
    role,
  } = req.body;

  const user = await Account.findOne({ email: email });

  if (user) {
    return res.status(400).send("User already exists.");
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const mailOptions = {
    to: email,
    from: "Eatsabyte",
    subject: "Verify your account",
    html: `<p>Please verify your email by clicking on the link below - Eatsabyte</p>
    <p>Click this <a href="https://eatsabyte.herokuapp.com/auth/verify/${verificationToken}">link</a> to verify your account.</p>
    `,
  };

  let newAccount = new Account({
    email: email,
    password: hashedPassword,
    role: role,
    accountVerifyToken: verificationToken,
  });

  await newAccount
    .save()
    .then((savedAccount) => {
      console.log("Account has been registered", savedAccount);
    })
    .catch((err) => {
      console.log("Account not saved", err);
    });

  let newRestaurant = new Restaurant({
    ownerName: ownerName,
    restaurantName: restaurantName,
    contact: contact,
    category: category,
    address: address,
    account: newAccount._id,
  });

  await newRestaurant
    .save()
    .then((savedRestaurant) => {
      console.log("Gmail Username", process.env.GMAIL_USER);
      console.log("Gmail Pass", process.env.GMAIL_PASS);
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log("Could not send email", err);
        } else {
          console.log("Email send successfully");
          // res.json(info);
        }
      });
      res.status(200).json({
        message: "Saved Restaurant and email sent for verification",
        data: savedRestaurant,
      });
    })
    .catch((err) => {
      console.log("Customer could not be saved.", err);
      return res.status(500).json({
        message: "Could not save Restaurant.",
      });
    });
};

exports.signupCustomer = async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send("Enter data correctly");

  const { firstName, lastName, contact, email, password, role } = req.body;

  const user = await Account.findOne({ email: email });

  if (user) {
    return res.status(404).send("User already exists.");
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const mailOptions = {
    to: email,
    from: "Eatsabyte",
    subject: "Verify your account",
    html: `<p>Please verify your email by clicking on the link below - Eatsabyte</p>
    <p>Click this <a href="https://eatsabyte.herokuapp.com/auth/verify/${verificationToken}">link</a> to verify your account.</p>
    `,
  };

  let newAccount = new Account({
    email: email,
    password: hashedPassword,
    role: role,
    accountVerifyToken: verificationToken,
  });

  await newAccount
    .save()
    .then((savedAccount) => {
      console.log("Account has been registered", savedAccount);
      // res.status(200).json({
      //   messgae: "Account registered",
      //   savedAccount: savedAccount,
      // });
    })
    .catch((err) => {
      if (err) {
        console.log("Account not saved, inside catch block");
        return res.status(400).json({
          message: "Account not saved inside catch block",
          error: err,
        });
      } else {
        console.log("Server Error");
        return res.status(500).json({
          message: "Server Error",
        });
      }
    });

  let newCustomer = new Customer({
    firstName: firstName,
    lastName: lastName,
    contact: contact,
    account: newAccount._id,
  });

  await newCustomer
    .save()
    .then((savedCustomer) => {
      console.log("Gmail Username", process.env.GMAIL_USER);
      console.log("Gmail Pass", process.env.GMAIL_PASS);
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log("Could not send email");
          return res.json({
            message: "Could not send mail",
            err,
          });
        } else {
          console.log("Email sent successfully");
          // return res.status(200).json({
          //   message: "Email sent for verification",
          //   info: info,
          // });
        }
      });
      return res.status(200).json({
        message: "Saved Customer",
        data: savedCustomer,
      });
    })
    .catch((err) => {
      console.log("Customer could not be saved.", err);
      if (err) {
        return res.status(400).json({
          message: "Could not save customer.",
          error: err,
        });
      } else {
        console.log("Server Error");
        return res.status(500).json({
          message: "Server Error",
        });
      }
    });
};

exports.verifyAccount = (req, res, next) => {
  const token = req.params.verificationToken;
  console.log("This is the verification token", token);
  Account.findOne({
    accountVerifyToken: token,
  })
    .then((account) => {
      if (!account) {
        const error = new Error(
          "Token in the url is tempered, don't try to fool me!"
        );
        error.statusCode = 403;
        throw error;
      }
      account.isVerified = true;
      account.accountVerifyToken = undefined;
      return account.save();
    })
    .then((account) => {
      res.json({ message: "Account verified successfully." });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
