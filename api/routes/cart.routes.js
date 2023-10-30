const express = require("express");
const router = express.Router();
const {
  addCart,
  removeCourse,
  confirmBuyCart,
  removeCart,
  cartCourses,
} = require("../controllers/cart.controller");
const validateIdsCart = require("../middleware/cartValidations.middleware");
const validateFields = require("../middleware/validateFields.middleware");
const { validateMongoID } = require("../middleware/userValidations.middleware");
const { Cart, User, Coupon } = require("../models");

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
router.put("/addDiscount", async (req, res) => {
  const { couponCode, mail } = req.body;
  const user = await User.findOne({ mail });
  const cart = await Cart.findOne({ userId: user._id });

  const validateCoupon = await Coupon.findOne({
    couponCode: couponCode.toUpperCase(),
    status: true,
  });

  const cartDiscount = await Cart.findOneAndUpdate(
    { userId: user._id },
    { discount: validateCoupon.discountCoupon }
  );
  const totaldiscount =
    cart.totalAmount - (cart.totalAmount * validateCoupon.discountCoupon) / 100;

  const newCart = await Cart.findOneAndUpdate(
    { _id: cart._id },
    { totaldiscount: totaldiscount },
    { new: true }
  );
  /* sd */
  res.send(newCart);
});

/* 
const newCart = await Cart.findOneAndUpdate(
    { _id: "653fb5d31c7ec4f93d27a0ff" }, // Condiciones de búsqueda, aquí asumo que estás buscando por ID
    { totaldiscount: 3000 }, // Actualización del campo
    { new: true } // Opciones, aquí 'new' devuelve el documento actualizado
  ); */
module.exports = router;
