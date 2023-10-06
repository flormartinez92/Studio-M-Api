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
    res.status(500).json(error);
  }
};

//crear un cupon
const createCoupon = async (req, res) => {
  try {
    const couponCreated = await Coupon.create(req.body);
    if (!couponCreated) {
      return res.status(404).json({ message: "error when creating a coupon" });
    }

    res.status(204).json({ message: "coupon created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//eliminar un cupon
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const couponRemoved = await Coupon.findOneAndDelete({ $where: id });
    if (!couponRemoved) {
      return res.status(404).json({ message: "error when deleting a coupon" });
    }

    res.status(200).json({ message: "coupon successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//actualizar un cupon
const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const couponToUpdate = await Coupon.findById(id);
    if (!couponToUpdate) {
      return res.status(401).json({ message: "coupon not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = { allProjects, updateProject, createCoupon, deleteCoupon };
