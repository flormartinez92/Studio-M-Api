const express = require("express");
const router = express.Router();
const user = require("./user.routes");
const cart = require("./cart.routes");
const course = require("./course.routes");

router.use("/user", user);
router.use("/cart", cart);
router.use("/course", course);

module.exports = router;
