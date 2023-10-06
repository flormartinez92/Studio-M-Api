const Course = require("../models/course.models");
const Project = require("../models/project.models");
const Coupon = require("../models/coupon.models");
const mongoose = require("mongoose");

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
  const id = req.params.projectId;
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

//crear un cupon
exports.createCoupon = async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    if (!newCoupon) {
      return res.status(404).json({ message: "error when creating a coupon" });
    }

    res
      .status(201)
      .json({ message: "coupon created successfully", coupon: newCoupon });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//eliminar un cupon
exports.deleteCoupon = async (req, res) => {
  const { couponId } = req.params;
  try {
    const couponRemoved = await Coupon.findOneAndDelete({ $where: couponId });
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
exports.updateCoupon = async (req, res) => {
  const { couponId } = req.params;
  const payload = req.body;
  try {
    const couponToUpdate = await Coupon.findByIdAndUpdate(couponId, payload, {
      new: true,
    });
    if (!couponToUpdate) {
      return res.status(401).json({ message: "coupon not found" });
    }

    await couponToUpdate.save();

    res.status(200).json({ message: "coupon updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

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
