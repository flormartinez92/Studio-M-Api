const { validationResult, check } = require("express-validator");
const { default: mongoose } = require("mongoose");

const validateCourse = [
  check("courseTitle", "Course title is required").not().isEmpty(),
  check("courseSubtitle", "Course subtitle is required").not().isEmpty(),
  check("courseDescription", "Course description is required").not().isEmpty(),
  check("modules", "Modules is required").not().isEmpty(),
  check("projects", "Projects is required").not().isEmpty(),
  check("projectsDescription", "Projects description is required")
    .not()
    .isEmpty(),
  check("completedCourse", "Completed description is required").not().isEmpty(),
  check("modules.*.moduleName", "Module name is required").not().isEmpty(),
  check("modules.*.topics", "topics is required").not().isEmpty(),
  check("modules.*.topics.*.topicName", "topic name is required")
    .not()
    .isEmpty(),
  check("modules.*.topics.*.classes", "classes is required").not().isEmpty(),
  check("modules.*.topics.*.classes.*.classInfo", "class is required")
    .not()
    .isEmpty(),
];

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send(errors);
  next();
};

const validateDeleteCoupon = [check("id", "id is not type mongo").isMongoId()];

const validateCoupon = [
  check("couponTitle", "Coupon title is required").not().isEmpty(),
  check("couponDescription", "Coupon Description is required").not().isEmpty(),
  check("couponCode", "Coupon Code is required").not().isEmpty(),
  check("startDate", "Start Date is required").not().isEmpty(),
  check("endDate", "End Date is required").not().isEmpty(),
  check("discountCoupon", "Discount Coupon is required").not().isEmpty(),
];

module.exports = {
  validateFields,
  validateCourse,
  validateDeleteCoupon,
  validateCoupon,
};
