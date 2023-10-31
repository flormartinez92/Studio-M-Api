const { User, Course, Project } = require("../models");

// Creacion del proyecto
exports.createProject = async (req, res) => {
  const { courseId } = req.params;
  const { project_url, mail } = req.body;
  try {
    const user = await User.findOne({ mail });
    if (!user) return res.status(404).send("User not found");

    const course = await Course.findOne({ _id: courseId });
    if (!course) res.status(404).send("Course not found");

    const newProject = await Project.create({
      userId: user._id,
      courseId: course._id,
      project_url,
    });

    await newProject.save();

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
