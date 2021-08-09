const app = require("express");
const router = app.Router();

const authMiddleWare = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Get all the restaurants
router.get("/get-restaurants", userController.getRestaurants);

// Get a specific restaurant based on its id.
router.get(
  "/get-restaurant/:restId",
  authMiddleWare.verifyCustomer,
  userController.getRestaurantMenus
);

// Posting order API.
router.post(
  "/post-order",
  authMiddleWare.verifyCustomer,
  userController.postOrder
);

router.post(
  "/post-comment",
  authMiddleWare.verifyCustomer,
  userController.postComment
);

router.delete(
  "/delete-comment",
  authMiddleWare.verifyCustomer,
  userController.postComment
);
module.exports = router;
