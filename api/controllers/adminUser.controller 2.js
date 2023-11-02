const { User } = require("../models");

// Esta ruta deberia ser del administrador
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

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).send("Users not found");
    res.status(200).send(users);
  } catch (error) {
    res.sendStatus(500);
  }
};
