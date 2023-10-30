const express = require("express");
const router = express.Router();
const user = require("./user.routes");
const cart = require("./cart.routes");
const course = require("./course.routes");
const adminCourse = require("./adminCourse.routes");
const adminUser = require("./adminUser.routes");
const adminCoupon = require("./adminCoupon.routes");
const project = require("./project.routes");
const adminProject = require("./adminProject.routes");

router.use("/user", user);
router.use("/cart", cart);
router.use("/course", course);
router.use("/adminCourse", adminCourse);
router.use("/adminUser", adminUser);
router.use("/adminCoupon", adminCoupon);
router.use("/project", project);
router.use("/adminProject", adminProject);

module.exports = router;
