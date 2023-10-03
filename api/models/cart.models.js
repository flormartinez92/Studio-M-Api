const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  course: {
    type: String,
    required: [true, "Course is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  isOpen: {
    type: Boolean,
  },
});

const Cart = model("Cart", CartSchema);

module.exports = Cart;
