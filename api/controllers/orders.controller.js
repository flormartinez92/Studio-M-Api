const { Order } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    await order.save();
    res.send(order).status(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const order = await Order.findOne({ userId, status: false });
    if (!order) return res.status(404).send("Order not found");
    Object.assign(order, req.body);
    await order.save();
    res.send(order).status(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.getOrderIdUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const orderResponse = await Order.findOne({ userId, status: false });
    if (!orderResponse) return res.status(200).send(""); // Respuesta vacía con estado 200 si no se encuentra la orden
    res.send(orderResponse).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
