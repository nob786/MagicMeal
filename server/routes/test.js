const app = require("express");
const router = app.Router();

const authMiddleWare = require("../middleware/authMiddleware");
const testController = require("../controllers/testController");

router.post("/text-msg", testController.testMsg);

router.post("/phone-verification", testController.verifyNumber);

router.post("/reset-password", testController.resetPassword);

router.get(
  "/getStats",
  authMiddleWare.verifyRestaurant,
  testController.getRestaurantStats
);
module.exports = router;
