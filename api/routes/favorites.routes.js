const express = require("express");
const router = express.Router();

router.post("/add", addFav);

router.get("/");

router.delete("/remove", removeFav);

module.exports = router;