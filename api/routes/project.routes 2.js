const express = require("express");
const router = express.Router();
const validateFields = require("../middleware/validateFields.middleware");
const { createProject } = require("../controllers/project.controller");
const {
  validateProject,
} = require("../middleware/projectValidations.middleware");

router.post(
  "/addProject/:courseId",
  validateProject,
  validateFields,
  createProject
);

module.exports = router;
