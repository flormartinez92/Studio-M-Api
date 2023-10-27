const { check } = require("express-validator");

const validateDeleteCoupon = [check("id", "id is not type mongo").isMongoId()];

const validateCoupon = [
  check("couponCode", "Coupon Code is required").not().isEmpty(),
  check("discountCoupon", "Discount Coupon is required").not().isEmpty(),
];

module.exports = { validateCoupon, validateDeleteCoupon };
