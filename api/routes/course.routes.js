const express = require("express");
const {
  allProjects,
  updateProject,
} = require("../controllers/course.controller");

const router = express.Router();

router.get("/projects", allProjects);
router.put("/updateProject", updateProject);

module.exports = router;
