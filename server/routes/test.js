const app = require("express");
const router = app.Router();

const testController = require("../controllers/testingcontroller");

router.post("/text-msg", testController.testMsg);

router.post("/phone-verification", testController.verifyNumber);

module.exports = router;
