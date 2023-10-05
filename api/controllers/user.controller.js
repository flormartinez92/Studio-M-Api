const User = require("../models/user.models");
const Course = require("../models/course.models");
const mongoose = require("mongoose");

const { generateToken } = require("../config/token");

exports.loginUser = async (req, res) => {
  const { mail, password } = req.body;

  try {
    const user = await User.findOne({ mail });
    if (!user) return res.status(404).send("user not found");
    const password_check = await user.validatorPassword(password);
    if (!password_check) return res.status(401).send("Invalid password");
    const { name, lastname } = user;

    const token = generateToken({ name, lastname, mail });
    res.cookie("token", token);
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.addUser = async (req, res) => {
  const { mail } = req.body;
  try {
    const email = await User.findOne({ mail });
    if (email) return res.status(400).send("Email is already registered");

    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.userPersistent = (req, res) => {
  res.send(req.user);
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, lastname, dni, password, profileImg } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.name = name || user.name;
    user.lastname = lastname || user.lastname;
    user.dni = dni || user.dni;
    user.password = password || user.password;
    user.profileImg = profileImg || user.profileImg;

    await user.save();

    return res.status(200).send("User updated successfully");
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).send("User not found");
    return res.status(200).send("User deleted successfully");
  } catch (error) {
    res.sendStatus(500);
  }
};

// Obtener todos los cursos

exports.allCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.send({ courses });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

//Obtener un curso en particular

exports.oneCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log("holaaaaa", courseId);
    const course = await Course.findById(courseId);
    if (!course) {
      return res.sendStatus(404);
    }
    res.send({ course });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
