const { check } = require("express-validator");

const validateCourse = [
  check("courseTitle", "Course title is required").not().isEmpty(),
  check("courseSubtitle", "Course subtitle is required").not().isEmpty(),
  check("courseDescription", "Course description is required").not().isEmpty(),
  check("modules", "Modules is required").not().isEmpty(),
  check("projects", "Projects is required").not().isEmpty(),
  check("projectsDescription", "Projects description is required")
    .not()
    .isEmpty(),
  check("completedCourse", "Completed description is required").not().isEmpty(),
  check("modules.*.moduleName", "Module name is required").not().isEmpty(),
  check("modules.*.topics", "topics is required").not().isEmpty(),
  check("modules.*.topics.*.topicName", "topic name is required")
    .not()
    .isEmpty(),
  check("modules.*.topics.*.classes", "classes is required").not().isEmpty(),
  check("modules.*.topics.*.classes.*.classInfo", "class is required")
    .not()
    .isEmpty(),
];

module.exports = { validateCourse };
