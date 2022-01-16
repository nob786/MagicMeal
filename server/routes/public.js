const app = require("express");
const router = app.Router();

const publicController = require("../controllers/publicController");

router.post(
  "/subscribe-to-newsletter",
  publicController.subscribeForNewsletter
);
<<<<<<< HEAD

=======
>>>>>>> 26fd2eb97955b7b1ab0576a548f96bf545c1ffeb
module.exports = router;
