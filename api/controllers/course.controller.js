const { Course } = require("../models");
const User = require("../models/user.models");
const Project = require("../models/project.models");
const Coupon = require("../models/coupon.models");

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

// LAS RUTAS DE ABAJO DEBERIAN ESTAR EN COUPON ROUTES Y PROJECT ROUTES

//rutas de marcos
//Ver todos los proyectos
exports.allProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "error getting projects" });
  }
};

//actualizar proyecto, aprobar o desaprobar
exports.updateProject = async (req, res) => {
  const { isApproved } = req.body;
  const id = req.params.id;
  try {
    // aca verificamos si el proyecto existe
    const existingProject = await Project.findById(id);

    if (!existingProject) {
      return res.status(404).json({ message: "project not found" });
    }

    // aca actualizamos el proyecto
    existingProject.isApproved = isApproved;

    //aca guardamos el proyecto actualizado
    await existingProject.save();

    res.status(200).json({ message: "corrected project" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
