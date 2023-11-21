const express = require("express");
const router = express.Router();
const validateFields = require("../middleware/validateFields.middleware");
const {
  createCoupon,
  updateCoupon,
  updateStatusCoupon,
  allCoupons,
  oneCoupon,
} = require("../controllers/adminCoupon.controller");
const {
  validateCoupon,
} = require("../middleware/couponValidations.middleware");
const {
  validateCouponID,
} = require("../middleware/mongoIdValidation.middleware");

//rutas agregar cupon
router.post("/add", validateCoupon, validateFields, createCoupon);

// actualizar cupon
router.put("/:couponId", validateCouponID, validateFields, updateCoupon);

// activar/desactivar cupon
router.put(
  "/enable-disable/:couponId",
  validateCouponID,
  validateFields,
  updateStatusCoupon
);

// todos los cupones
router.get("/allCoupons", allCoupons);

// un cupon
router.get(
  "/allCoupons/:couponId",
  validateCouponID,
  validateFields,
  oneCoupon
);

module.exports = router;
