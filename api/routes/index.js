const express = require("express");
const router = express.Router();
const user = require("./user.routes");
const cart = require("./cart.routes");
const course = require("./course.routes");
const adminCourse = require("./adminCourse.routes");
const adminUser = require("./adminUser.routes");
<<<<<<< HEAD
<<<<<<< HEAD
const favorites = require("./favorites.routes");
=======
const adminCoupon = require("./adminCoupon.routes");
const project = require("./project.routes");
const adminProject = require("./adminProject.routes");
>>>>>>> b506f9859ba42ba7a303018489734d9e7767d979
=======
const favorites = require("./favorites.routes");
const adminCoupon = require("./adminCoupon.routes");
const project = require("./project.routes");
const adminProject = require("./adminProject.routes");
>>>>>>> 8d9b350ea2f4f390a3d2958abfa07b3f7bcf056e

router.use("/user", user);
router.use("/cart", cart);
router.use("/course", course);
router.use("/adminCourse", adminCourse);
router.use("/adminUser", adminUser);
<<<<<<< HEAD
<<<<<<< HEAD
router.use("/favorites", favorites);
=======
router.use("/adminCoupon", adminCoupon);
router.use("/project", project);
router.use("/adminProject", adminProject);
>>>>>>> b506f9859ba42ba7a303018489734d9e7767d979
=======
router.use("/favorites", favorites);
router.use("/adminCoupon", adminCoupon);
router.use("/project", project);
router.use("/adminProject", adminProject);
>>>>>>> 8d9b350ea2f4f390a3d2958abfa07b3f7bcf056e

module.exports = router;
