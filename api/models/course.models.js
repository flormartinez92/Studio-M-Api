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
    required: [true, "Course Description are required"],
  },
  modules: [
    {
      type: String,
      required: [true, "Modules are required"],

      topics: [
        {
          type: String,
          required: [true, "Topics are required"],

          classes: [
            {
              type: String,
              required: [true, "Classes are required"],

              videoUrl: {
                type: String,
                required: [true, "Video Url is required"],
              },
            },
          ],
        },
      ],
    },
  ],
  FinalProject: {
    type: String,
    required: [true, "Project title is required"],
  },
  projectDescription: {
    type: String,
    required: [true, "Project Description is required"],
  },
  finishedCourseDescription: {
    type: String,
    required: [false],
  },
});

const Course = model("Course", CourseSchema);

module.exports = Course;