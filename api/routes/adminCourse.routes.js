const express = require("express");
const router = express.Router();
const validateFields = require("../middleware/validateFields.middleware");
const {
  addCourse,
  updateCourse,
  allCourses,
} = require("../controllers/adminCourse.controller");
const {
  validateCourse,
  validateMongoIdCourse,
} = require("../middleware/courseValidations.middleware");

//rutas agregar curso
router.post("/add", validateCourse, validateFields, addCourse);
//rutas actualizar curso
router.put("/:id", validateMongoIdCourse, validateFields, updateCourse);
//enable disable curso
router.put(
  "/enable-disable/:id",
  validateMongoIdCourse,
  validateFields,
  updateCourse
);
router.get("/all-courses", allCourses);

module.exports = router;
