const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

// Agrear Curso al carrito de compra
router.post("/add/:courseId/:userId", cartController.add);

// Eliminar producto de carrito de compra
router.delete("/remove/:courseId/:userId", cartController.remove);

// Confirmacion de Compra
router.post("/confirmBuy/:userId", cartController.confirmBuy);

module.exports = router;
