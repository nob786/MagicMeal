const app = require("express");
const router = app.Router();
const multer = require("multer");
const path = require("path");

// this create a path like './uploads/'
//const uploadsDir = path.resolve(__dirname, "uploads");
//const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const itemController = require("../controllers/itemController");
const authMiddleWare = require("../middleware/authMiddleware");

// router.post("/image", upload.single("itemImage"), itemController.testImage);

router.post(
  "/add-item",
  authMiddleWare.verifyRestaurant,
  //upload.single("itemImage"),
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

router.post(
  "/upload-location/:lat/:lng",
  authMiddleWare.verifyRestaurant,
  itemController.uploadLocation
);

module.exports = router;
