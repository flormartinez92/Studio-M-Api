const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
  },
  course: {
    type: String,
    required: [true, "Course is required"],
  },
  projectLink: {
    type: String,
    required: [true, "Project's link is required"],
  },
  comment: {
    type: String,
    required: [false],
  },
  isApproved: {
    type: Boolean,
  },
});

const Project = model("Project", ProjectSchema);

module.exports = Project;
