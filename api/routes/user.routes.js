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
  updateCourseAdvance,
  courseAdvance,
  allCertificates,
  updateImgUser,
} = require("../controllers/user.controller");
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateMongoID,
  validateUpdateCourseAdvance,
  validateEmail,
} = require("../middleware/userValidations.middleware");
const validateFields = require("../middleware/validateFields.middleware");
const {
  validateUploadUser,
} = require("../middleware/adminImageValidations.middleware");

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
router.post(
  "/resetPassword",
  validateResetPassword,
  validateFields,
  resetPassword
);

//ruta actualizar imagen
router.put("/updateImg", validateUploadUser, validateFields, updateImgUser);
// Ruta para actualizar el estado de la clase
router.put(
  "/courseAdvance",
  validateUpdateCourseAdvance,
  validateFields,
  updateCourseAdvance
);

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

router.get(
  "/userCourses/:userId",
  validateMongoID,
  validateFields,
  userCourses
);

// Ruta que me traiga los certificados del usuario
router.get(
  "/certificate/:userId",
  validateMongoID,
  validateFields,
  allCertificates
);

//RUTA QUE TRAE LA INFO DEL USUARIO
router.get("/:userId", validateMongoID, validateFields, userData);

module.exports = router;
