const express = require("express");
const router = express.Router();
const { deleteUser, getUsers } = require("../controllers/adminUser.controller");
const { validateMongoID } = require("../middleware/userValidations.middleware");
const validateFields = require("../middleware/validateFields.middleware");

// Esta ruta deberia ser del administrador/optional???
router.delete("/:userId", validateMongoID, validateFields, deleteUser);

// Ruta trae todos los usuarios
router.get("/allUsers", getUsers);

module.exports = router;
