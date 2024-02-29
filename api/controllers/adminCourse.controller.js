const { Course } = require("../models/");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

exports.addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.sendStatus(500);
  }
};
exports.updateImgCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).send("Course not found");
    //limpiar imagenes previas
    if (course.courseImg_url) {
      const nameFile = course.courseImg_url.split("/").pop();
      const [public_id] = nameFile.split(".");
      await cloudinary.uploader.destroy(public_id);
    }
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    course.courseImg_url = secure_url;

    await course.save();
    res.status(200).send(course);
  } catch (err) {
    res.status(500).send(err);
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
