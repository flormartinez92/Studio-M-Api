const express = require("express");
const {
  loginUser,
  addUser,
  userPersistent,
  logout,
  updateUser,
  deleteUser,
  allCourses,
  oneCourse,
  forgotPassword,
} = require("../controllers/user.controller");
const { check, body } = require("express-validator");
const validateFields = require("../middleware/validateFields.middleware");
const { validateUser } = require("../middleware/auth.middleware");
const router = express.Router();

router.post(
  "/add",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Last name is required").not().isEmpty(),
    check("dni", "Dni is required").not().isEmpty(),
    check("mail", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "The password must be at least 4 characters").isLength({
      min: 4,
    }),
    check("mail", "The email is not valid").isEmail(),
    validateFields,
  ],
  addUser
);

router.post(
  "/login",
  [
    check("mail", "Email is required").not().isEmpty(),
    check("mail", "The email is not valid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

router.get("/me", validateUser, userPersistent);

router.post("/logout", logout);

router.put(
  "/update/:userId",
  [
    check("name").optional().not().isEmpty(),
    check("lastname").optional().not().isEmpty(),
    check("dni").optional().not().isEmpty(),
    check("password", "The password must be at least 4 characters")
      .optional()
      .isLength({ min: 4 }),
    body("profileImg")
      .optional()
      .custom((value) => {
        if (!value) return true;
        if (
          value.startsWith("http://") ||
          value.startsWith("https://") ||
          value.endsWith(".png") ||
          value.endsWith(".svg")
        ) {
          return true;
        }
        throw new Error("Profile image must be a URL or a PNG/SVG file");
      })
      .withMessage("Profile image must be a URL or a PNG/SVG file"),
    validateFields,
  ],
  updateUser
);

router.delete("/:userId", deleteUser);

router.get("/allCourses", allCourses);

router.get("/allCourses/:courseId", oneCourse);

router.post(
  "/forgot",
  [
    check("mail", "Email is required").not().isEmpty(),
    check("mail", "The email is not valid").isEmail(),
    validateFields,
  ],
  forgotPassword
);

module.exports = router;
