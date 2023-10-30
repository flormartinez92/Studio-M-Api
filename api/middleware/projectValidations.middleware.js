const { check } = require("express-validator");

const validateProject = [
  check("courseId", "courseId is not type mongo").isMongoId(),
  check("mail", "Email is required").not().isEmpty(),
  check("project_url", "Link is required").not().isEmpty(),
];

const validateAdminUpdateProject = [
  check("projectId", "projectId is not type mongo").isMongoId(),
  check("mail", "Email is required").not().isEmpty(),
  check("comment", "Comment is required").not().isEmpty(),
];

module.exports = {
  validateProject,
  validateAdminUpdateProject,
};
