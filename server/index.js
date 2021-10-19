const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const auth = require("./routes/auth");
const item = require("./routes/item");
const user = require("./routes/user");
// Process env variables
PORT = process.env.PORT;
//const dbUrl = process.env.DB_URL || "mongodb://localhost/vidly";

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASS}@cluster0.mj1ib.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => console.log("Monogo is running"))
  .catch((error) => console.log("Error while connecting to atlas", error));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", auth);
app.use("/item", item);
app.use("/user", user);

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
