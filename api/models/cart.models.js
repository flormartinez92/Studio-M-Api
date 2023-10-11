const { Schema, model, SchemaType } = require("mongoose");

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  course: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
  ],
  price: {
    type: Number,
    required: [false, "Price is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Cart = model("Cart", CartSchema);

module.exports = Cart;
