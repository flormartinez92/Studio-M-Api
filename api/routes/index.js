const express = require("express");
const router = express.Router();
const user = require("./user.routes");
const cart = require("./cart.routes");

router.use("/user", user);
router.use("/cart", cart);

module.exports = router;
