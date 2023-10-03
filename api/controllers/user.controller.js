const User = require("../models/user.models");
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
