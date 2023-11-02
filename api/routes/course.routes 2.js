const express = require("express");
const router = express.Router();
const validateFields = require("../middleware/validateFields.middleware");
const { oneCourse, allCourses } = require("../controllers/course.controller");
const {
  validateMongoIdCourse,
} = require("../middleware/courseValidations.middleware");

router.get("/all-courses", allCourses);

router.get(
  "/all-courses/:id",
  validateMongoIdCourse,
  validateFields,
  oneCourse
);

module.exports = router;
