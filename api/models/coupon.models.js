const { Schema, model } = require("mongoose");

const CouponSchema = new Schema({
  couponCode: {
    type: String,
    unique: true,
    required: [true, "Coupon Code is required"],
  },
  discountCoupon: {
    type: Number,
    required: [true, "Discount coupon is required"],
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Coupon = model("Coupon", CouponSchema);

module.exports = Coupon;
