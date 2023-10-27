const { check } = require("express-validator");

const validateCourse = [
  check("courseTitle", "Course title is required").not().isEmpty(),
  check("courseSubtitle", "Course subtitle is required").not().isEmpty(),
  check("courseDescription", "Course description is required").not().isEmpty(),
  check("courseLevel", "Course Level is required").not().isEmpty(),
  check("courseDuration", "Course Duration is required").not().isEmpty(),
  check("courseImg_url", "Image url is required").not().isEmpty(),
  check("coursePrice", "Course Price is required").not().isEmpty(),
  check("modules", "Modules is required").not().isEmpty(),
  check("projectsTitle", "Projects Title is required").not().isEmpty(),
  check("projectsDescription", "Projects description is required")
    .not()
    .isEmpty(),
  check("projectAim", "Project Aim is required").not().isEmpty(),
  check("modules.*.moduleName", "Module name is required").not().isEmpty(),
  check("modules.*.topics", "topics is required").not().isEmpty(),
  check("modules.*.topics.*.topicName", "topic name is required")
    .not()
    .isEmpty(),
  check("modules.*.topics.*.classes", "classes is required").not().isEmpty(),
  check("modules.*.topics.*.classes.*.classInfo", "class is required")
    .not()
    .isEmpty(),
  check("modules.*.topics.*.classes.*.video_url", "video url is required")
    .not()
    .isEmpty(),
];

const validateMongoIdCourse = [check("id", "id is not type mongo").isMongoId()];

module.exports = { validateCourse, validateMongoIdCourse };
