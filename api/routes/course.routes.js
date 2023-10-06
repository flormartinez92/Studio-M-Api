const express = require("express");
const {
  allProjects,
  updateProject,
  createCoupon,
  deleteCoupon,
  updateCoupon,
} = require("../controllers/course.controller");

const router = express.Router();

router.get("/projects", allProjects);
router.put("/updateProject/:projectId", updateProject);
router.post("/createCoupon", createCoupon);
router.delete("/deleteCoupon/:couponId", deleteCoupon);
router.put("/updateCoupon/:couponId", updateCoupon);

module.exports = router;
