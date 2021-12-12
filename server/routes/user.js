const app = require("express");
const router = app.Router();

const authMiddleWare = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Get booked tables
router.get(
  "/get-my-reservations",
  authMiddleWare.verifyCustomer,
  userController.getReservedTables
);
// Get all the restaurants
router.get(
  "/get-restaurants",
  authMiddleWare.verifyCustomer,
  userController.getRestaurants
);

// Get a specific restaurant based on its id.
router.get(
  "/get-restaurant-menu/:restId",
  authMiddleWare.verifyCustomer,
  userController.getRestaurantMenus
);

// Fetching updated orders from order collection
router.get(
  "/get-updated-order/:customerId",
  authMiddleWare.verifyCustomer,
  userController.getUpdatedOrder
);

// Posting order API.
router.post(
  "/post-order/:restId",
  authMiddleWare.verifyCustomer,
  userController.postOrder
);

// Posting comments for a restaurant
router.post(
  "/post-comment/:restId",
  authMiddleWare.verifyCustomer,
  userController.postComment
);

// Delete a comment
router.delete(
  "/delete-comment",
  authMiddleWare.verifyCustomer,
  userController.deleteComment
);

// Fetching restuarants in a 10 km radius
router.get(
  "/restaurants-location/:lat/:ln",
  authMiddleWare.verifyCustomer,
  userController.getRestaurantsByAddress
);

// Booking a table
router.post(
  "/book-table",
  authMiddleWare.verifyCustomer,
  userController.bookTable
);

module.exports = router;
