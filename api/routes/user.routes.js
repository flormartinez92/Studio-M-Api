const express = require("express");
const router = express.Router();
const { validateUser } = require("../middleware/auth.middleware");
const validateFields = require("../middleware/validateFields.middleware");
const { validateUploadUser } = require("../middleware/adminImageValidations.middleware");
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
  classUsers,
  pdfCertificate,
} = require("../controllers/user.controller");
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateMongoID,
  validateUpdateCourseAdvance,
  validateUpdateUserPassword,
  validateEmail,
  validateMongoclassId,
} = require("../middleware/userValidations.middleware");

// RUTAS DEL USUARIO

// Register
router.post("/add", validateRegister, validateFields, addUser);

// Login
router.post("/login", validateLogin, validateFields, loginUser);

// Persistencia
router.get("/me", validateUser, userPersistence);

// Logout
router.post("/logout", logout);

// Forgot Password
router.post("/forgot", validateForgotPassword, validateFields, forgotPassword);

// Reset Password
router.post(
  "/resetPassword",
  validateResetPassword,
  validateFields,
  resetPassword
);

//Ruta para traer los cursos comprados por un usuario
router.post("/userCourses", validateEmail, validateFields, userCourses);

//Ruta que trae la informacion del usuario
router.get("/:userId", validateMongoID, validateFields, userData);

// router.get("/:userId/courses", validateMongoID, userCourses);

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
router.put(
  "/updateUserPassword/:userId",
  validateUpdateUserPassword,
  validateFields,
  updateUserPassword
);

router.get(
  "/userCourses/:userId",
  validateMongoID,
  validateFields,
  userCourses
);

router.get(
  "/courseClass/:userId/:courseId/:classId",
  validateMongoclassId,
  validateFields,
  classUsers
);

// Ruta que me traiga los certificados del usuario
router.get(
  "/certificate/:userId",
  validateMongoID,
  validateFields,
  allCertificates
);

//Ruta que descarga el PDF del certificado
router.get("/certificate/download/:userId/:courseId", validateMongoID, validateFields, pdfCertificate);

module.exports = router;
