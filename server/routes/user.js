const app = require("express");
const router = app.Router();

const authMiddleWare = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Get all the restaurants
router.get("/get-restaurants", userController.getRestaurants);

// Get a specific restaurant based on its id.
router.get(
  "/get-restaurant/:restaurantId",
  authMiddleWare.verifyCustomer,
  userController.getRestaurant
);

// Posting order API.
router.post(
  "/post-order",
  authMiddleWare.verifyCustomer,
  userController.postOrder
);

module.exports = router;
