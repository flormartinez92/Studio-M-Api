const express = require("express");
const router = express.Router();
const {addFav, showFav, removeFav} = require("../controllers/favorites.controller");

router.post("/add/:courseId/:userId", addFav);

router.get("/:userId", showFav);

router.delete("/remove/:courseId/:userId", removeFav);

module.exports = router;