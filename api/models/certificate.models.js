const { Schema, model } = require("mongoose");

const CouponSchema = new Schema({
  couponTitle: {
    type: String,
    required: [true, "Coupon Title is required"],
  },
});

const Coupon = model("Coupon", CouponSchema);

module.exports = Coupon;
