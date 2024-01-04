const mercadopago = require("mercadopago");
const { Order } = require("../models");
const { MercadoPagoConfig, Preference } = require("mercadopago");

exports.createOrder = async (req, res) => {
  const { orderId, title, price } = req.body;
  try {
    const orderResponse = await Order.findById(orderId);
    console.log(orderResponse);
    if (!orderResponse) {
      // no se encontro la orden
      return res.sendStatus(500);
    }
    const client = new MercadoPagoConfig({
      accessToken: process.env.ACCESS_TOKEN_MP,
    });

    try {
      const preference = new Preference(client);
      priceNumber = parseFloat(price);
      const result = await preference.create({
        body: {
          items: [
            {
              id: orderId,
              title: title,
              quantity: 1,
              unit_price: priceNumber,
            },
          ],
          back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending",
          },
          auto_return: "approved",
        },
      });
      console.log(result);
      orderResponse.mpPreferenceID = result.id;
      await orderResponse.save();
      res.send(orderResponse).status(200);
    } catch (error) {
      console.error("Error creating preference:", error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
