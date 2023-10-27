const { User, Token, Course } = require("../models");
const { generateToken } = require("../config/token");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");

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
    res.status(200).send(user);
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
    res.status(201).send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.userPersistence = (req, res) => {
  res.send(req.user);
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

// Este controlador hay que verlo cuando definamos lo de cloudinary
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

// Ruta para poner el mail y que te envien un correo con un link de recuperacion de contraseña.
exports.forgotPassword = async (req, res) => {
  const { mail } = req.body;

  try {
    const userMail = await User.findOne({ mail });
    if (!userMail) return res.status(404).send("user not found");

    let token = await Token.findOne({ userId: userMail._id });
    if (token) await token.deleteOne();

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 10);

    await new Token({
      userId: userMail._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `${process.env.STUDIO_M_CLIENT_HOST}/reset-password?token=${resetToken}&id=${userMail._id}`;

    sendEmail(
      userMail.mail,
      "Recuperar contraseña",
      {
        name: userMail.name,
        link: link,
      },
      `./template/requestResetPassword.handlebars`
    );
    res.status(200).send(link);
  } catch (error) {
    res.sendStatus(500);
  }
};

// Ruta para recuperar la contraseña.
exports.resetPassword = async (req, res) => {
  const { userId, token, password } = req.body;

  try {
    let passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken)
      return res.status(404).send("Invalid or expired password reset token");

    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid)
      return res.status(404).send("Invalid or expired password reset token");

    const user = await User.findById({ _id: userId });
    if (!user) return res.status(404).send("user not found");

    const hash = await bcrypt.hash(password, user.salt);
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );

    sendEmail(
      user.mail,
      "Contraseña recuperada exitosamente",
      { name: user.name },
      "./template/resetPassword.handlebars"
    );
    await passwordResetToken.deleteOne();

    res.status(200).send("Password reset was successful");
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.userCourses = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("user not found");

    const coursesId = user.course;
    const coursesInfo = await Course.find({ _id: { $in: coursesId } });
    if (!coursesId) return res.status(200).send([]);

    res.status(200).send(coursesInfo);
  } catch (error) {
    res.sendStatus(500);
  }
};

//ruta para devolver los datos del usuario
exports.userData = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("user not found");

    res.status(200).send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};
