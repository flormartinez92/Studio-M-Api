const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  totalAmmount: {
    type: String,
    require: [true, "Total ammount is required"],
  },
  status: {
    type: Boolean,
    default: false,
  },
  transactionID: {
    type: String,
    default: "",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  mpPreferenceID: {
    type: String,
    default: "",
  },
});

const Order = model("Order", OrderSchema);

module.exports = Order;
