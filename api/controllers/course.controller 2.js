const { Course } = require("../models");

exports.allCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: true });
    if (!courses) return res.status(404).send("Courses not found");
    res.status(200).send(courses);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.oneCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) return res.status(404).send("Course not found");

    res.status(200).send(course);
  } catch (error) {
    console.error(error);
  }
};
