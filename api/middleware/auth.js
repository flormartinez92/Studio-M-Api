const { validateToken } = require("../config/token");

const validateUser = (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token de autenticación faltante" });
    }

    const payload = validateToken(token);

    if (!payload) {
      return res.status(401).json({ message: "Invalid authorization token" });
    }

    req.user = payload;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = { validateUser };
