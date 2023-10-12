const { Schema, model } = require("mongoose");
const Class = new Schema({
  classInfo: {
    type: String,
    required: [true, "class is required"],
  },
  video_url: {
    type: String,
    required: [true, "url is required"],
  },
});

const topic = new Schema({
  topicName: {
    type: String,
    required: [true, "topic name is required"],
  },
  classes: {
    type: [Class],
    required: [true, "classes is required"],
  },
});

const moduleSchema = new Schema({
  moduleName: {
    type: String,
    required: [true, "Module name is required"],
  },
  topics: {
    type: [topic],
    required: [true, "topics is required"],
  },
});

const CourseSchema = new Schema({
  courseTitle: {
    type: String,
    required: [true, "Course title is required"],
  },
  courseSubtitle: {
    type: String,
    required: [true, "Course subtitle is required"],
  },
  courseDescription: {
    type: String,
    required: [true, "Course description is required"],
  },
  coursePrice: {
    type: String,
    required: [true, "Price is required"],
  },
  courseImg_url: {
    type: String,
    required: [true, "url is required"],
  },
  modules: {
    type: [moduleSchema],
    required: [true, "Modules is required"],
  },
  projects: {
    type: String,
    required: [true, "Projects is required"],
  },
  projectsDescription: {
    type: String,
    required: [true, "Projects description is required"],
  },
  completedCourse: {
    type: String,
    required: [true, "Completed description is required"],
  },
});

const Course = model("Course", CourseSchema);

module.exports = Course;
