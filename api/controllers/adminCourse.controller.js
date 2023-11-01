const { Course } = require("../models/");

exports.addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
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
    res.status(200).send(updateCourse);
  } catch (error) {
    res.sendStatus(500);
  }
};
exports.allCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) return res.status(404).send("Courses not found");
    res.status(200).send(courses);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
