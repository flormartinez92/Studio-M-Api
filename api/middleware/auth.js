const { validateToken } = require("../config/token");

const validateUser = (req, res, next) => {
  const { token } = req.cookies;
  try {
    const payload = validateToken(token);
    //console.log(payload);
    req.user = payload;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = { validateUser };
