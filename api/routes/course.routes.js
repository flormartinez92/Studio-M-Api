const express = require("express");
const { check } = require("express-validator");
//const validateFields = require("../middleware/validateFields.middleware");
const {
  validateCourse,
  validateFields,
} = require("../middleware/validateFields.middleware2");

const { addCourse } = require("../controllers/course.controller");
const router = express.Router();

router.post("/add", validateCourse, addCourse);

module.exports = router;
