const express = require("express");
const { loginUser, addUser } = require("../controllers/userController");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");
const router = express.Router();

router.post(
  "/add",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("dni", "El dni es obligatorio").not().isEmpty(),
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("password", "EL password debe tener al menos 5 letras").isLength({
      min: 5,
    }),
    check("correo", "EL correo no es valido").isEmail(),
    validarCampos,
  ],
  addUser
);
router.post("/login", loginUser);

module.exports = router;
