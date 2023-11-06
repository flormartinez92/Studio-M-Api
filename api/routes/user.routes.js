const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const { validateUser } = require("../middleware/auth.middleware");
const {
  addUser,
  loginUser,
  userPersistence,
  logout,
  updateUserData,
  forgotPassword,
  resetPassword,
  userCourses,
  userData,
  updateCourseAdvance,
  allCertificates,
  updateImgUser,
  updateUserPassword,
} = require("../controllers/user.controller");
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateMongoID,
  validateUpdateCourseAdvance,
  validateUpdateUserPassword,
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

// Update user data (name, lastname, dni)
router.put(
  "/updateUserData/:userId",
  validateMongoID,
  validateFields,
  updateUserData
);

// Update user data (password)
router.put("/updateUserPassword/:userId", updateUserPassword);

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
