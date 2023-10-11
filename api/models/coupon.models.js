const { Schema, model } = require("mongoose");

const CouponSchema = new Schema({
  couponCode: {
    type: String,
    unique: true,
    required: [true, "Coupon Code is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Start Date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End Date is required"],
  },
  discountCoupon: {
    type: Number,
    required: [true, "Discount coupon is required"],
  },
});

const Coupon = model("Coupon", CouponSchema);

module.exports = Coupon;
