const express = require("express");
const {
  getOrderIdUser,
  createOrder,
  updateOrder,
} = require("../controllers/orders.controller");
const {
  validateMongoID,
} = require("../middleware/mongoIdValidation.middleware");
const validateFields = require("../middleware/validateFields.middleware");
const router = express.Router();

router.post("/add", createOrder);

router.put(
  "/updateOrder/:userId",
  validateMongoID,
  validateFields,
  updateOrder
);
router.get("/:userId", validateMongoID, validateFields, getOrderIdUser);

module.exports = router;
