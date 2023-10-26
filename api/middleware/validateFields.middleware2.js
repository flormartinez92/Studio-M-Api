const { validationResult, check, body } = require("express-validator");
const { default: mongoose } = require("mongoose");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send(errors);
  next();
};

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

const validateRegister = [
  check("name", "Name is required").not().isEmpty(),
  check("lastname", "Last name is required").not().isEmpty(),
  check("dni", "Dni is required").not().isEmpty(),
  check("mail", "Email is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
  check(
    "password",
    "The password must be at least 8 characters, contain at least one uppercase, contain at least one lower case, contain at least one number."
  )
    .isLength({
      min: 8,
    })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z\d@$.!%*#?&]/),
  check("mail", "The email is not valid").isEmail(),
];

const validateLogin = [
  check("mail", "Email is required").not().isEmpty(),
  check("mail", "The email is not valid").isEmail(),
  check("password", "Password is required").not().isEmpty(),
];

const validateForgotPassword = [
  check("mail", "Email is required").not().isEmpty(),
  check("mail", "The email is not valid").isEmail(),
];

const validateResetPassword = [
  body("userId").isMongoId().withMessage("Invalid userId format"),
  body("token").notEmpty().withMessage("Token is required"),
  check("password", "Password is required").not().isEmpty(),
  check(
    "password",
    "The password must be at least 8 characters, contain at least one uppercase, contain at least one lower case, contain at least one number."
  )
    .isLength({
      min: 8,
    })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z\d@$.!%*#?&]/),
];

const validateDeleteCoupon = [check("id", "id is not type mongo").isMongoId()];

const validateCoupon = [
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
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
};
