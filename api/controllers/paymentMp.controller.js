const mercadopago = require("mercadopago");
const { MercadoPagoConfig, Preference } = require("mercadopago");

exports.createOrder = async (req, res) => {
  const { title, price } = req.body;
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN_MP,
  });

  try {
    const preference = new Preference(client);
    priceNumber = price;
    console.log("NUMBERRR--------------------------------------", priceNumber);
    const result = await preference.create({
      body: {
        items: [
          {
            title: title,
            quantity: 1,
            unit_price: 20,
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
    res.json({ result });
  } catch (error) {
    console.error("Error creating preference:", error);
    res.status(500).send("Internal Server Error");
  }
};

// exports.receiveWebhook = async (req, res) => {
//   const payment = req.query;
//   if (payment.type === "payment") {
//     const data = await mercadopago.Payment.findById(payment["data.id"]);
//   }
//   res.send("webhook");
// };
