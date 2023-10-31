const { check } = require("express-validator");

const validateIdsCart = [
  check("userId", "userId is not MongoId format").isMongoId(),
  check("courseId", "courseId is not MongoId format").isMongoId(),
];

module.exports = validateIdsCart;
