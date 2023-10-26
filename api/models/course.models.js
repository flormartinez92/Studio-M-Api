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
  courseLevel: {
    type: String,
    required: [true, "Level is required"],
  },
  courseDuration: {
    type: String,
    required: [true, "Duration is required"],
  },
  courseImg_url: {
    type: String,
    required: [true, "url is required"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  modules: {
    type: [moduleSchema],
    required: [true, "Modules is required"],
  },
  projectsTitle: {
    type: String,
    required: [true, "Projects is required"],
  },
  projectsDescription: {
    type: String,
    required: [true, "Projects description is required"],
  },
  projectAim: {
    type: String,
    required: [true, "Project Aim is required"],
  },
});

const Course = model("Course", CourseSchema);

module.exports = Course;
