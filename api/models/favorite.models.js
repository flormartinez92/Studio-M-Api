const { Schema, model } = require("mongoose");

const FavoriteSchema = new Schema({
  courseId: [
    {
      type: Schema.Types.ObjectId,
      required: [true, "Course is required"],
      ref: "Course",
    },
  ],
  userId: [
    {
      type: Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
  ],
});

const Favorite = model("Favorite", FavoriteSchema);

module.exports = Favorite;
