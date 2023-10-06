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
const createCoupon = async (req, res) => {
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
const deleteCoupon = async (req, res) => {
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
const updateCoupon = async (req, res) => {
  const { couponId } = req.params;
  const {
    couponTitle,
    couponDescription,
    couponCode,
    startDate,
    endDate,
    discountCoupon,
  } = req.body;

  try {
    const couponToUpdate = await Coupon.findById(couponId);
    if (!couponToUpdate) {
      return res.status(401).json({ message: "coupon not found" });
    }

    // aca actualizamos con lo que nos llegan por el req.body o lo dejamos como esta(si es q no viene nada por el body)
    couponToUpdate.couponTitle = couponTitle || couponToUpdate.couponTitle;
    couponToUpdate.couponDescription =
      couponDescription || couponToUpdate.couponDescription;
    couponToUpdate.couponCode = couponCode || couponToUpdate.couponCode;
    couponToUpdate.startDate = startDate || couponToUpdate.startDate;
    couponToUpdate.endDate = endDate || couponToUpdate.endDate;
    couponToUpdate.discountCoupon =
      discountCoupon || couponToUpdate.discountCoupon;

    await couponToUpdate.save();

    res.status(200).json({ message: "coupon updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = {
  allProjects,
  updateProject,
  createCoupon,
  deleteCoupon,
  updateCoupon,
};
