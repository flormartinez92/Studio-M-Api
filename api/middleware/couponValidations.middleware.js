const { check } = require("express-validator");

const validateDeleteCoupon = [check("id", "id is not type mongo").isMongoId()];

const validateDiscount = [
  check("mail", "Email is required").not().isEmpty(),
  check("couponCode", "Coupon Code is required").not().isEmpty(),
];

const validateCoupon = [
  check("couponCode", "Coupon Code is required").not().isEmpty(),
  check("discountCoupon", "Discount Coupon is required").not().isEmpty(),
];

module.exports = { validateCoupon, validateDeleteCoupon, validateDiscount };
