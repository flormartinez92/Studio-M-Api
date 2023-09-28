const Usuario = require("../models/user");

exports.loginUser = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const user = await Usuario.findOne({ correo });
    if (!user) return res.status(404).send("user not found");
    const password_check = await user.validatorPassword(password);
    if (password_check) return res.status(200).send(user);
    else return res.status(401).send("Invalid password");
  } catch (error) {
    res.sendStatus(500);
  }
};
exports.addUser = async (req, res) => {
  const { correo } = req.body;
  const usuario = new Usuario(req.body);
  //verificamos si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail)
    return res.status(400).send("Correo ya se encuentra registrado");
  await usuario.save();
  res.send(usuario);
};
