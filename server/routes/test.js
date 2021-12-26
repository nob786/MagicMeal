const app = require("express");
const router = app.Router();

const testController = require("../controllers/testController");

router.post("/text-msg", testController.testMsg);

router.post("/phone-verification", testController.verifyNumber);

router.post("/reset-password", testController.resetPassword);

module.exports = router;
