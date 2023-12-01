const { Project, User, Certificate, Course } = require("../models");
const sendEmail = require("../utils/sendEmail");
const puppeteer = require('puppeteer');
const fs = require('fs');
const certificateTemplate = require("../utils/template/certificateTemplate");
const path = require("path");

// Obtener todos los proyectos
exports.allProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: false })
      .populate("userId")
      .populate("courseId");
    console.log(projects);

    if (!projects) res.status(404).send("Projects not found");

    const projectsData = projects.map((item) => {
      const { userId, courseId, status, project_url, comment, _id } = item;

      return {
        projectId: _id,
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

// Cambiar el estado del proyecto (aprobado o desaprobado), crear certificado y PDF del certificado
exports.updateStatusProject = async (req, res) => {
  const { projectId } = req.params;
  const { status, userId, courseId } = req.body;

  try {
    const projectToUpdate = await Project.findByIdAndUpdate( projectId, { status }, { new: true });
    !projectToUpdate && res.status(404).send("project not found");

    const user = await User.findById(userId);
    !user && res.status(404).send("user not found");

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).send("Course not found");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const certificateHTML = await certificateTemplate(user, course);

    await page.setContent(certificateHTML);

    const pdfPath = path.resolve(`certificates/certificate_${userId}_${courseId}.pdf`);
    const directoryPath = path.dirname(pdfPath);
    fs.mkdirSync(directoryPath, { recursive: true });
    const options = { path: pdfPath, format: 'A4'};

    await page.pdf(options);
    await browser.close();

    const certificate = await Certificate.create({
      userId,
      courseId,
      description: "Ha realizado y completado con éxito su curso en by M Studio, cumpliendo con todos los requisitos académicos exigidos",
      pdfPath,
    });

    await certificate.save();
    await projectToUpdate.save();

    res.status(200).json({ filePath: pdfPath });
  } catch (error) {
    console.error(error);
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
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");

    res.status(200).send(project);
  } catch (error) {
    console.error(error);
  }
};
