const express = require("express");
const router = express.Router();
const {
  addCart,
  removeCourse,
  confirmBuyCart,
  removeCart,
  cartCourses,
  addDiscount,
} = require("../controllers/cart.controller");
const validateIdsCart = require("../middleware/cartValidations.middleware");
const validateFields = require("../middleware/validateFields.middleware");
const { validateMongoID } = require("../middleware/userValidations.middleware");
const {
  validateDiscount,
} = require("../middleware/couponValidations.middleware");

// Agrear Curso al carrito de compra
router.post("/add", validateIdsCart, validateFields, addCart);

// Eliminar producto de carrito de compra
router.delete(
  "/remove/:courseId/:userId",
  validateIdsCart,
  validateFields,
  removeCourse
);

// Ruta eliminar todo el carrito
router.delete("/remove/:userId", validateMongoID, validateFields, removeCart);

// Ruta ver cursos del carrito
router.get("/courses/:userId", validateMongoID, validateFields, cartCourses);

// Confirmacion de Compra
router.post(
  "/confirmBuy/:userId",
  validateMongoID,
  validateFields,
  confirmBuyCart
);

// Agregar cupon de descuento
router.put("/addDiscount", validateDiscount, validateFields, addDiscount);

module.exports = router;
