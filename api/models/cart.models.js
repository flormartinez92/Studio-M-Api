const { Schema, model, SchemaType } = require("mongoose");

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  courseId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
  ],
  totalAmount: {
    type: Number,
    required: [true, "Price is required"],
  },
  couponDiscount: [
    {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
      required: [true, "Coupon discount is required"],
    },
  ],
});

const Cart = model("Cart", CartSchema);

module.exports = Cart;
