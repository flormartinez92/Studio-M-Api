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
  addCourse,
  updateCourse,
  deleteCourse,
  getUsers,
  oneCourse,
  allCourses,
} = require("../controllers/course.controller");

const router = express.Router();

//rutas de marcos
router.get("/projects", allProjects);
router.put(
  "/updateProject/:id",
  [check("id", "id is not type mongo").isMongoId()],
  updateProject
);
router.post("/addCoupon", validateCoupon, createCoupon);
router.delete("/deleteCoupon/:id", validateDeleteCoupon, deleteCoupon);
router.put(
  "/updateCoupon/:id",
  [check("id", "id is not type mongo").isMongoId()],
  updateCoupon
);

//rutas de ivan

router.post("/add", validateCourse, addCourse);
router.put(
  "/:id",
  [check("id", "id is not type mongo").isMongoId(), validateFields],
  updateCourse
);
router.delete(
  "/:id",
  [check("id", "id is not type mongo").isMongoId(), validateFields],
  deleteCourse
);
router.get("/", getUsers);

router.get("/all-courses", allCourses);

router.get("/all-courses/:courseId", oneCourse);

module.exports = router;
