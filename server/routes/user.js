const app = require("express");
const router = app.Router();

const authMiddleWare = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Get all the restaurants
router.get("/get-restaurants", userController.getRestaurants);

// Get a specific restaurant based on its id.
router.get(
  "/get-restaurant-menu/:restId",
  //authMiddleWare.verifyCustomer,
  userController.getRestaurantMenus
);

// Fetching updated orders from order collection
router.get(
  "/get-updated-order/:customerId",
  //authMiddleWare.verifyCustomer,
  userController.getUpdatedOrder
);

// Posting order API.
router.post(
  "/post-order/:restId",
  authMiddleWare.verifyCustomer,
  userController.postOrder
);

router.post(
  "/post-comment/:restId",
  authMiddleWare.verifyCustomer,
  userController.postComment
);

router.delete(
  "/delete-comment",
  authMiddleWare.verifyCustomer,
  userController.deleteComment
);
router.post(
  "/restaurants-location/:lat/:ln",
  userController.getRestaurantsByAddress
);

module.exports = router;
