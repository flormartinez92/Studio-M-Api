const express = require("express");
const { check } = require("express-validator");
//const validateFields = require("../middleware/validateFields.middleware");
const {
  validateCourse,
  validateFields,
} = require("../middleware/validateFields.middleware2");

const {
  addCourse,
  updateCourse,
  deleteCourse,
  getUsers,
} = require("../controllers/course.controller");
const router = express.Router();

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

module.exports = router;
