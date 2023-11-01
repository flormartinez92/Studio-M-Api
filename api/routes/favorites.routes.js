const express = require("express");
const router = express.Router();
const {addFav, showFav, removeFav} = require("../controllers/favorites.controller");
const {validateMongoID} = require("../middleware/mongoIdValidation.middleware");

router.post("/add/:courseId/:userId", validateMongoID, addFav);

router.get("/:userId", validateMongoID, showFav);

router.delete("/remove/:courseId/:userId", validateMongoID, removeFav);

module.exports = router;