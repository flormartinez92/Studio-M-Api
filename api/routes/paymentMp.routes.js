const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/paymentMp.controller");

router.post("/create-order", createOrder);
router.get("/success", (req, res) => res.send("success"));
router.get("/failure", (req, res) => res.send("failure"));
router.get("/pending", (req, res) => res.send("pending"));

module.exports = router;
