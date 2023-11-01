const express = require("express");
const router = express.Router();
const user = require("./user.routes");
const cart = require("./cart.routes");
const course = require("./course.routes");
const adminCourse = require("./adminCourse.routes");
const adminUser = require("./adminUser.routes");
<<<<<<< HEAD
const favorites = require("./favorites.routes");
=======
const adminCoupon = require("./adminCoupon.routes");
const project = require("./project.routes");
const adminProject = require("./adminProject.routes");
>>>>>>> b506f9859ba42ba7a303018489734d9e7767d979

router.use("/user", user);
router.use("/cart", cart);
router.use("/course", course);
router.use("/adminCourse", adminCourse);
router.use("/adminUser", adminUser);
<<<<<<< HEAD
router.use("/favorites", favorites);
=======
router.use("/adminCoupon", adminCoupon);
router.use("/project", project);
router.use("/adminProject", adminProject);
>>>>>>> b506f9859ba42ba7a303018489734d9e7767d979

module.exports = router;
