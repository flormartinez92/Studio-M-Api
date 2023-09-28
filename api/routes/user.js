const express = require("express");
const {
  loginUser,
  addUser,
  userPersistent,
  logout,
} = require("../controllers/userController");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { validateUser } = require("../middleware/auth");
const router = express.Router();

router.post(
  "/add",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Last name is required").not().isEmpty(),
    check("dni", "Dni is required").not().isEmpty(),
    check("mail", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "The password must be at least 4 characters").isLength({
      min: 4,
    }),
    check("mail", "The email is not valid").isEmail(),
    validarCampos,
  ],
  addUser
);
router.post(
  "/login",
  [
    check("mail", "Email is required").not().isEmpty(),
    check("mail", "The email is not valid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validarCampos,
  ],
  loginUser
);

router.get("/me", validateUser, userPersistent);
router.post("/logout", logout);

module.exports = router;
