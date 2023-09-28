const Usuario = require("../models/user");
const { generateToken } = require("../config/token");

exports.loginUser = async (req, res) => {
  const { mail, password } = req.body;

  try {
    const user = await Usuario.findOne({ mail });
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

  const user = new Usuario(req.body);
  //verificamos si el correo existe
  const email = await Usuario.findOne({ mail });
  if (email) return res.status(400).send("Email is already registered");
  await user.save();
  res.send(user);
};

exports.userPersistent = async (req, res) => {
  res.send(req.user);
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};
