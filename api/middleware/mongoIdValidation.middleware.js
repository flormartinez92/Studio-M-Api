const { check } = require("express-validator");

const validateMongoID = [check("userId", "id is not type mongo").isMongoId()];
const validateCouponID = [
  check("couponId", "id is not type mongo").isMongoId(),
];
const validateProjectId = [
  check("projectId", "projectId is not type mongo").isMongoId(),
];

module.exports = {
  validateMongoID,
  validateCouponID,
  validateProjectId,
};
