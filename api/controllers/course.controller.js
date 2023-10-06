const Course = require("../models/course.models");

exports.addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.send(course);
  } catch (error) {
    res.sendStatus(500);
  }
};
