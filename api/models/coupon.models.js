const { Schema, model } = require("mongoose");

const CouponSchema = new Schema({
  couponTitle: {
    type: String,
    required: [true, "Coupon Title is required"],
  },
  couponDescription: {
    type: String,
    required: [true, "Coupon Description is required"],
  },
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
  quantityAvailable: {
    type: Number,
    default: 1,
  },
  discountCoupon: {
    type: Number,
    required: [true, "Discount coupon is required"],
  },
});

const Coupon = model("Coupon", CouponSchema);

module.exports = Coupon;
