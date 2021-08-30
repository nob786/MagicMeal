const app = require("express");
const router = app.Router();

const itemController = require("../controllers/itemController");
const authMiddleWare = require("../middleware/authMiddleware");

router.post(
  "/add-item",
  authMiddleWare.verifyRestaurant,
  itemController.addItem
);
router.delete(
  "/delete-item/:itemId",
  authMiddleWare.verifyRestaurant,
  itemController.deleteItem
);
router.put(
  "/update-item/:itemId",
  authMiddleWare.verifyRestaurant,
  itemController.updateItem
);
router.get(
  "/get-items",
  authMiddleWare.verifyRestaurant,
  itemController.getItems
);
router.get(
  "/get-item/:itemId",
  authMiddleWare.verifyRestaurant,
  itemController.getItem
);

// API for updating pending order status
router.put(
  "/update-pending-orders/:restId",
  // authMiddleWare.verifyRestaurant,
  itemController.updatePendingOrders
);

// API for fetching pending orders
router.get(
  "/get-pending-orders/:restId",
  // authMiddleWare.verifyRestaurant,
  itemController.getPendingOrders
);

module.exports = router;
