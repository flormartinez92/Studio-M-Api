const express = require("express");
const router = express.Router();
const user = require("./user.routes");
const cart = require("./cart.routes");
const course = require("./course.routes");
const adminCourse = require("./adminCourse.routes");
const adminUser = require("./adminUser.routes");
const adminCoupon = require("./adminCoupon.routes");

router.use("/user", user);
router.use("/cart", cart);
router.use("/course", course);
router.use("/adminCourse", adminCourse);
router.use("/adminUser", adminUser);
router.use("/adminCoupon", adminCoupon);

module.exports = router;
