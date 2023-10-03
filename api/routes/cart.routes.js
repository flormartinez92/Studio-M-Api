const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const { check } = require("express-validator");
const validateFields = require("../middleware/validateFields.middleware");

// Agrear Curso al carrito de compra
// Eliminar producto de carrito de compra
// Confirmacion de Compra


router.post("/add/:courseId/:userId", 
[
  check("user", "User is required").not().isEmpty(),
  check("course", "Course is required").not().isEmpty(),
  check("price", "Price is required").not().isEmpty(),
  validateFields
], cartController.add)