const { Schema, model } = require("mongoose");

const CourseSchema = new Schema({
  courseTitle: {
    type: String,
    required: [true, "Course Title is required"],
  },
  courseSubtitle: {
    type: String,
    required: [false],
  },
  courseDescription: {
    type: String,
    required: [true, "Course Description is required"],
  },
  modules: {
    type: String,
    required: [true, "Modules is required"],
  },
  topics: {
    type: String,
    required: [true, "Topics is required"],
  },
  classes: {
    type: String,
    required: [true, "Classes is required"],
  },
  videoUrl: {
    type: String,
    required: [true, "Video Url is required"],
  },
  projects: {
    type: String,
    required: [true, "Projects is required"],
  },
  projectsDescription: {
    type: String,
    required: [true, "Projects Description is required"],
  },
  completedCourse: {
    type: String,
    required: [false],
  },
});

const Course = model("Course", CourseSchema);

module.exports = Course;
