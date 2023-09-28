const express = require("express");
const router = express.Router();
// Punto de entrada rutas
const user = require("./user");

router.use("/user", user);
module.exports = router;
