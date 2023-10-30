const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
  status: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
  },
  project_url: {
    type: String,
    required: [true, "Link is required"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course is required"],
  },
});

const Project = model("Project", ProjectSchema);

module.exports = Project;
