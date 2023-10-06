const express = require("express");
const {
  allProjects,
  updateProject,
  createCoupon,
  deleteCoupon,
} = require("../controllers/course.controller");

const router = express.Router();

router.get("/projects", allProjects);
router.put("/updateProject/:id", updateProject);
router.post("/createCoupon", createCoupon);
router.delete("/deleteCoupon/:id", deleteCoupon);

module.exports = router;
