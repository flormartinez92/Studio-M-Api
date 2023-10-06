const Course = require("../models/course.models");
const Project = require("../models/project.models");
const Coupon = require("../models/coupon.models");
const mongoose = require("mongoose");

//Ver todos los proyectos
const allProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "error getting projects" });
  }
};

//actualizar proyecto, aprobar o desaprobar
const updateProject = async (req, res) => {
  try {
    const { isApproved } = req.body;
    const id = req.params.projectId;

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
    res.status(401).json(error);
  }
};

//crear un cupon
const createCoupon = async (req, res) => {};

//eliminar un cupon
const deleteCoupon = async (req, res) => {};

//actualizar un cupon
const updateCoupon = async (req, res) => {};

module.exports = { allProjects, updateProject };
