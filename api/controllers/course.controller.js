const Course = require("../models/course.models");
const User = require("../models/user.models");

exports.addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.send(course);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updateCourse = await Course.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!updateCourse) return res.status(404).send("Course not found");
    res.send(updateCourse);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCourse = await Course.findByIdAndDelete(id);
    if (!deleteCourse) return res.status(404).send("Course not found");
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.sendStatus(500);
  }
};
