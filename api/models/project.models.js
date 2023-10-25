const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
  status: {
    type: Boolean,
  },
  comment: {
    type: String,
  },
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
});

const Project = model("Project", ProjectSchema);

module.exports = Project;
