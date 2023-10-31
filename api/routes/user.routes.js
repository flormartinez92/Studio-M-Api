const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const { validateUser } = require("../middleware/auth.middleware");
const {
  addUser,
  loginUser,
  userPersistence,
  logout,
  updateUser,
  forgotPassword,
  resetPassword,
  userCourses,
  userData,
} = require("../controllers/user.controller");
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateMongoID,
} = require("../middleware/userValidations.middleware");
const validateFields = require("../middleware/validateFields.middleware");

// RUTAS DEL USUARIO

// Register
router.post("/add", validateRegister, validateFields, addUser);

// Login
router.post("/login", validateLogin, validateFields, loginUser);

// Persistence
router.get("/me", validateUser, userPersistence);

// Logout
router.post("/logout", logout);

// ForgotPassword
router.post("/forgot", validateForgotPassword, validateFields, forgotPassword);

// ResetPassword
router.post("/resetPassword", validateResetPassword, validateFields, resetPassword);

//Ruta que trae la informacion del usuario
router.get("/:userId", validateMongoID, validateFields, userData);

//Ruta para traer los cursos comprados por un usuario
router.get("/:userId/courses", validateMongoID, userCourses);

// RUTAS QUE QUEDAN POR CHEQUEAR

// Update (Esto hay que verlo porque vamos a usar Cloudinary)
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

// Esta ruta deberia ser del administrador

//router.get("/:userId/purchasedCourse", userCourses);

module.exports = router;