const { check } = require("express-validator");

const validateCourse = [
  check("courseLongTitle", "Course long title is required").not().isEmpty(),
  check("courseShortTitle", "Course short title is required").not().isEmpty(),
  check("courseSubtitle", "Course subtitle is required").not().isEmpty(),
  check("courseDescription", "Course description is required").not().isEmpty(),
  check("courseLevel", "Course Level is required").not().isEmpty(),
  check("courseDuration", "Course Duration is required").not().isEmpty(),
  check("coursePrice", "Course Price is required").not().isEmpty(),
  check("modules", "Modules is required").not().isEmpty(),
  check("projectsTitle", "Projects Title is required").not().isEmpty(),
  check("modules.*.moduleName", "Module name is required").not().isEmpty(),
];

const validateMongoIdCourse = [check("id", "id is not type mongo").isMongoId()];

module.exports = { validateCourse, validateMongoIdCourse };
