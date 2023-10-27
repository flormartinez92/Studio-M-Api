const express = require("express");
const router = express.Router();
const validateFields = require("../middleware/validateFields.middleware");

const {
  validateCourse,
  validateMongoIdCourse,
} = require("../middleware/courseValidations.middleware");
const {
  createCoupon,
  updateCoupon,
  updateStatusCoupon,
  allCoupons,
} = require("../controllers/adminCoupon.controller");
const {
  validateCoupon,
} = require("../middleware/couponValidations.middleware");
const {
  validateCouponID,
} = require("../middleware/mongoIdValidation.middleware");

//rutas agregar cupon
router.post("/add", validateCoupon, validateFields, createCoupon);
router.put("/:couponId", validateCouponID, validateFields, updateCoupon);
router.put(
  "/enable-disable/:couponId",
  validateCouponID,
  validateFields,
  updateStatusCoupon
);
router.get("/allCoupons", allCoupons);

module.exports = router;
