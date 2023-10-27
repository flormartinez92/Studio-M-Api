const { Course } = require("../models/");

//rutas de ivan
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
exports.allCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
