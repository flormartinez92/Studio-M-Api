const express = require("express");
const router = express.Router();
const validateFields = require("../middleware/validateFields.middleware");
const {
  createProject,
  updateProject,
} = require("../controllers/project.controller");
const {
  validateProject,
  validateUserUpdateLinkProject,
} = require("../middleware/projectValidations.middleware");

router.post(
  "/addProject/:courseId",
  validateProject,
  validateFields,
  createProject
);

router.put(
  "/updateProject/:projectId",
  validateUserUpdateLinkProject,
  validateFields,
  updateProject
);

module.exports = router;
