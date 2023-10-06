const Course = require("../models/course.models");
const mongoose = require("mongoose");

//Ver todos los proyectos
const allProjects = async (req, res) => {
  try {
    const projects = await Course.find();
    res.json(projects);
  } catch (error) {
    res.status(400).json({ error: "error getting projects" });
  }
};

//actualizar proyecto, aprobar o desaprobar
const updateProject = async (req, res) => {
  const { id } = req.params;
  const project = await Course.updateOne()
};

module.exports = { allProjects, updateProject };
