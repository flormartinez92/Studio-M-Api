const { body } = require("express-validator");

const validateAddCart = [
  body("userId").isMongoId().withMessage("Invalid userId format"),
  body("courseId").isMongoId().withMessage("Invalid courseId format"),
];

module.exports = validateAddCart;
