const express = require("express");
const router = express.Router();
const {
  allProjects,
  updateProject,
  updateStatusProject,
  deleteProject,
} = require("../controllers/adminProject.controller");
const {
  validateAdminUpdateProject,
} = require("../middleware/projectValidations.middleware");
const validateFields = require("../middleware/validateFields.middleware");
const {
  validateProjectId,
} = require("../middleware/mongoIdValidation.middleware");

//rutas para obtener todos los proyectos
router.get("/allProjects", allProjects);

// ruta para agregar un comentario al proyecto
router.put(
  "/:projectId",
  validateAdminUpdateProject,
  validateFields,
  updateProject
);

// ruta para aprobar proyecto
router.put(
  "/approved/:projectId",
  validateProjectId,
  validateFields,
  updateStatusProject
);

// Ruta para eliminar proyectos
router.delete("/:projectId", validateProjectId, validateFields, deleteProject);

module.exports = router;
