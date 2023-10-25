const { Schema, model } = require("mongoose");

const AdvanceSchema = new Schema({
  userId: [
    {
      type: Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
  ],
});

const Advance = model("Advance", AdvanceSchema);

module.exports = Advance;
