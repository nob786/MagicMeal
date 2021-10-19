const app = require("express");
const router = app.Router();

const authController = require("../controllers/authController");

router.post("/signup-customer", authController.signupCustomer);
router.post("/signup-restaurant", authController.signupRestaurant);
router.get("/verify/:verificationToken", authController.verifyAccount);
router.post("/login", authController.login);

module.exports = router;
