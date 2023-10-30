const { Schema, model } = require("mongoose");
const Course = require("./course.models");

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
    default: 0,
  },
  totaldiscount: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
});

CartSchema.pre("save", async function (next) {
  try {
    const coursePrices = await Course.find({
      _id: { $in: this.courseId },
    }).select("coursePrice");

    const totalCartAmount = coursePrices.reduce(
      (acc, course) => acc + parseFloat(course.coursePrice),
      0
    );

    this.totalAmount = totalCartAmount;

    next();
  } catch (error) {
    return next(error);
  }
});

const Cart = model("Cart", CartSchema);

module.exports = Cart;
