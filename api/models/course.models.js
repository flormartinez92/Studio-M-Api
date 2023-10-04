const { Schema, model } = require("mongoose");

const CourseSchema = new Schema({
  courseTitle: {
    type: String,
    required: [true, "Course Title is required"],
  },
  courseSubtitle: {
    type: Text,
    required: [false],
  },
  courseDescription: {
    type: Text,
    required: [true, "Course Description is required"],
  },
  modules: {
    type: String,
    required: [true, "Modules is required"],
  },
  topics: {
    type: Text,
    required: [true, "Topics is required"],
  },
  classes: {
    type: Text,
    required: [true, "Classes is required"],
  },
  videoUrl: {
    type: String,
    required: [true, "Video Url is required"],
  },
  projects: {
    type: Text,
    required: [true, "Projects is required"],
  },
  projectsDescription: {
    type: Text,
    required: [true, "Projects Description is required"],
  },
  completedCourse: {
    type: Text,
    required: [fasle],
  },
});

const Course = model("Course", CourseSchema);

module.exports = Course;