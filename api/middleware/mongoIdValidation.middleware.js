const { check } = require("express-validator");

const validateMongoID = [check("userId", "id is not type mongo").isMongoId()];

module.exports = {
  validateMongoID,
};
