const express = require("express");

const { check } = require("express-validator");
//const validateFields = require("../middleware/validateFields.middleware");
const {
  validateCourse,
  validateFields,
  validateCoupon,
  validateDeleteCoupon,
} = require("../middleware/validateFields.middleware2");

const {
  allProjects,
  updateProject,
  createCoupon,
  deleteCoupon,
  updateCoupon,
} = require("../controllers/course.controller");

const router = express.Router();

//rutas de marcos
router.get("/projects", allProjects);
router.put("/updateProject/:projectId", updateProject);
router.post("/createCoupon", validateCoupon, createCoupon);
router.delete("/deleteCoupon/:couponId", validateDeleteCoupon, deleteCoupon);
router.put("/updateCoupon/:couponId", validateCoupon, updateCoupon);

//rutas de ivan
const { addCourse } = require("../controllers/course.controller");

router.post("/add", validateCourse, addCourse);

module.exports = router;
