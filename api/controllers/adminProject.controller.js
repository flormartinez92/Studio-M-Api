const { Project, User } = require("../models");
const sendEmail = require("../utils/sendEmail");

// Obtener todos los proyectos
exports.allProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects) res.status(404).send("Projects not found");

    res.status(200).send(projects);
  } catch (error) {
    res.sendStatus(500);
  }
};

// enviar un comentario del proyecto
exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { comment, mail } = req.body;
  try {
    const user = await User.findOne({ mail });
    if (!user) return res.status(404).send("user not found");

    const projectToUpdate = await Project.findByIdAndUpdate(
      projectId,
      { comment },
      {
        new: true,
      }
    );
    if (!projectToUpdate) {
      return res.status(404).send("Project not found");
    }
    await projectToUpdate.save();

    sendEmail(
      mail,
      "Correcciones del proyecto",
      { name: user.name, comment },
      "./template/projectComment.handlebars"
    );

    res.status(200).send("Project updated successfully");
  } catch (error) {
    res.sendStatus(500);
  }
};

// Cambiar el estado del proyecto (aprobado o desaprobado)
exports.updateStatusProject = async (req, res) => {
  const { projectId } = req.params;
  const playload = req.body;

  try {
    const projectToUpdate = await Project.findByIdAndUpdate(
      projectId,
      playload,
      {
        new: true,
      }
    );
    if (!projectToUpdate) {
      return res.status(404).send("project not found");
    }

    await projectToUpdate.save();
    res.status(200).send("Project updated successfully");
  } catch (error) {
    res.sendStatus(500);
  }
};

// Ruta para eliminar proyectos de la base de datos
exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) return res.status(404).send("project not found");
    return res.status(200).send("Project deleted successfully");
  } catch (error) {
    res.sendStatus(500);
  }
};
