const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrder,
  createOrderIvan,
  feedbackMp,
  updateStatus,
} = require("../controllers/paymentMp.controller");

//router.post("/create-order", createOrder);
/* router.get("/success", (req, res) => res.send("success"));
router.get("/failure", (req, res) => res.send("failure"));
router.get("/pending", (req, res) => res.send("pending"));
router.put("/updateOrder", updateOrder); */
router.post("/create-order", createOrder);
//router.get("/feedback", feedbackMp);
router.put("/updateStatus", updateStatus);

module.exports = router;
