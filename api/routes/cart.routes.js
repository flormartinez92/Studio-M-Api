const express = require("express");
const router = express.Router();
const {
  addCart,
  removeCart,
  confirmBuyCart,
} = require("../controllers/cart.controller");
const validateAddCart = require("../middleware/cartValidations.middleware");
const validateFields = require("../middleware/validateFields.middleware");

// Agrear Curso al carrito de compra
router.post("/add", validateAddCart, validateFields, addCart);

// Eliminar producto de carrito de compra
router.delete("/remove/:courseId/:userId", removeCart);

// Ruta eliminar todo el carrito

// Confirmacion de Compra
router.post("/confirmBuy/:userId", confirmBuyCart);

module.exports = router;
