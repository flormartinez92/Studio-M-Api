const express = require("express");
const router = express.Router();
const {
  addFav,
  showFav,
  removeFav,
} = require("../controllers/favorites.controller");
const {
  validateMongoID,
} = require("../middleware/mongoIdValidation.middleware");
const validateFields = require("../middleware/validateFields.middleware");
const validateIdsCart = require("../middleware/cartValidations.middleware");

router.post("/add/:courseId/:userId", validateIdsCart, validateFields, addFav);

router.get("/:userId", validateMongoID, validateFields, showFav);

router.delete(
  "/remove/:courseId/:userId",
  validateIdsCart,
  validateFields,
  removeFav
);

module.exports = router;
