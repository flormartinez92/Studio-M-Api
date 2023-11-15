const { Project, User, Certificate } = require("../models");
const sendEmail = require("../utils/sendEmail");

// Obtener todos los proyectos
exports.allProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: false })
      .populate("userId")
      .populate("courseId");

    if (!projects) res.status(404).send("Projects not found");

    const projectsData = projects.map((item) => {
      const { userId, courseId, status, project_url, comment } = item;

      return {
        status,
        project_url,
        comment,
        name: userId.name,
        lastname: userId.lastname,
        mail: userId.mail,
        courseShortTitle: courseId.courseShortTitle,
        courseLongTitle: courseId.courseLongTitle,
        projectsTitle: courseId.projectsTitle,
        courseId: courseId._id,
        userId: userId._id,
      };
    });

    res.status(200).send(projectsData);
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
  const { status, userId, courseId } = req.body;

  try {
    const projectToUpdate = await Project.findByIdAndUpdate(
      projectId,
      { status },
      {
        new: true,
      }
    );
    if (!projectToUpdate) {
      return res.status(404).send("project not found");
    }

    const certificate = await Certificate.create({
      userId,
      courseId,
      description:
        "Ha realizado y completado con éxito su curso en by M Studio, cumpliendo con todos los requisitos académicos exigidos",
    });

    await certificate.save();
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

// ruta para un solo proyecto
exports.oneProject = async (req, res) => {
  try {
    const { proyectId } = req.params;

    const project = await Project.findById(proyectId);
    if (!project) return res.status(404).send("Project not found");

    res.status(200).send(project);
  } catch (error) {
    console.error(error);
  }
};
