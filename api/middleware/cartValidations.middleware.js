const { body } = require("express-validator");

const validateAddCart = [
  body("userId", "userId is not MongoId format").isMongoId(),
  body("courseId", "courseId is not MongoId format").isMongoId(),
];

module.exports = validateAddCart;
