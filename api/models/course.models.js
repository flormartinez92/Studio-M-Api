const { Schema, model } = require("mongoose");
const Class = new Schema({
  classInfo: {
    type: String,
    default: "",
  },
  video_url: {
    type: String,
    default: "",
  },
});

const topic = new Schema({
  topicName: {
    type: String,
    default: "",
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
  courseLongTitle: {
    type: String,
    required: [true, "Course long title is required"],
  },
  courseShortTitle: {
    type: String,
    required: [true, "Course short title is required"],
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
    required: [false],
    default:
      "https://images-ext-2.discordapp.net/external/aakjVbAOtaeGXmD4ExiIUwIWGOx314nVds22EYVIFXI/%3Fwidth%3D800%26name%3DQue%2520es%2520el%2520error%2520404%25201-1.png/https/www.cyberclick.es/hs-fs/hubfs/04.%2520BLOG/Que%2520es%2520el%2520error%2520404%25201-1.png?width=1600&height=1010",
  },
  courseImgSmall_url : {
    type: String,
    required: [false],
    default: 
      "https://images-ext-2.discordapp.net/external/aakjVbAOtaeGXmD4ExiIUwIWGOx314nVds22EYVIFXI/%3Fwidth%3D800%26name%3DQue%2520es%2520el%2520error%2520404%25201-1.png/https/www.cyberclick.es/hs-fs/hubfs/04.%2520BLOG/Que%2520es%2520el%2520error%2520404%25201-1.png?width=1600&height=1010",
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
    default: "",
  },
  projectAim: {
    type: String,
    default: "",
  },
});

const Course = model("Course", CourseSchema);

module.exports = Course;
