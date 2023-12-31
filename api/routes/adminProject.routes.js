const express = require("express");
const router = express.Router();
const {
  allProjects,
  oneProject,
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

// ruta para aprobar proyecto (y crear certificado, y PDF del certificado)
router.put(
  "/approved/:projectId",
  validateProjectId,
  validateFields,
  updateStatusProject
);

// Ruta para eliminar proyectos
router.delete("/:projectId", validateProjectId, validateFields, deleteProject);

//rutas para obtener un proyecto
router.get(
  "/allProjects/:projectId",
  validateProjectId,
  validateFields,
  oneProject
);

module.exports = router;
