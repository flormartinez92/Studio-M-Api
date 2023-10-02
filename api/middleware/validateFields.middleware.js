const { validationResult } = require("express-validator");

export default validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send(errors);
  next();
};
