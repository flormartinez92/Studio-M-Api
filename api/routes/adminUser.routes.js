const express = require("express");
const router = express.Router();
const { deleteUser, getUsers } = require("../controllers/adminUser.controller");
const { validateMongoID } = require("../middleware/userValidations.middleware");
const validateFields = require("../middleware/validateFields.middleware");

// RUTAS QUE QUEDAN POR CHEQUEAR

// Esta ruta deberia ser del administrador/optional???
router.delete("/:userId", validateMongoID, validateFields, deleteUser);

// Ruta trae todos los usuarios
router.get("/allUsers", getUsers);

//Ruta para obtener los cursos comprados por un usuario en particular
/* router.get("/cart/:userId", userCart);

router.get("/:userId/purchasedCourse", userCourses);

router.get("/:userId", userData); */

module.exports = router;
